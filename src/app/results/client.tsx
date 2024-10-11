'use client'
import React, { useEffect } from 'react';
import {
  FetchUserGeneSetQuery,
  useEnrichmentQueryQuery,
  useFetchGeneInfoQuery,
  useFetchUserGeneSetQuery,
  useOverlapQueryQuery,
  useViewGeneSetQuery
} from '@/generated/graphql'
import ensureArray from "@/utils/ensureArray"
import Loading from '@/components/loading'
import Pagination from '@/components/pagination'
import useQsState from '@/utils/useQsState'
import Stats from '../stats'
import Image from 'next/image'
import GeneSetModal from '@/components/geneSetModal'
import partition from '@/utils/partition'
import { FiSearch, FiX, FiDownload } from 'react-icons/fi'
import { Buffer } from 'buffer';

const pageSize = 10

type GeneSetModalT = {
  type: 'UserGeneSet',
  description: string,
  genes: string[],
} | {
  type: 'GeneSetOverlap',
  id: string,
  description: string,
  genes: string[]
} | {
  type: 'GeneSet',
  id: string,
  description: string,
} | undefined

function encodeNodeId(tableName: string, id: string): string {
  const data = JSON.stringify([tableName, id]);
  return Buffer.from(data).toString('base64');
}

function description_markdown(text: string) {
  if (!text) return <span className="italic">No description found</span>
  const m = /\*\*(.+?)\*\*/.exec(text)
  if (m) return <><span>{text.slice(0, m.index)}</span><span className="font-bold italic">{m[1]}</span><span>{text.slice(m.index + 4 + m[1].length)}</span></>
  return text
}

function Breakable(props: { children: string }) {
  return props.children.split('_').map((part, i) => <React.Fragment key={i}>{(i === 0 ? '' : '_') + part}<wbr /></React.Fragment>)
}

function EnrichmentResults({ userGeneSet, setModalGeneSet }: { userGeneSet?: FetchUserGeneSetQuery, setModalGeneSet: React.Dispatch<React.SetStateAction<GeneSetModalT>> }) {
  const genes = React.useMemo(() =>
    ensureArray(userGeneSet?.userGeneSet?.genes).filter((gene): gene is string => !!gene).map(gene => gene.toUpperCase()),
    [userGeneSet]
  )
  const [queryString, setQueryString] = useQsState({ page:  '1', q: '' })
  const [rawTerm, setRawTerm] = React.useState('')
  const { page, term } = React.useMemo(() => ({ page: queryString.page ? +queryString.page : 1, term: queryString.q ?? '' }), [queryString])
  const { data: enrichmentResults } = useEnrichmentQueryQuery({
    skip: genes.length === 0,
    variables: { genes, filterTerm: term, offset: (page-1)*pageSize, first: pageSize },
  })
  React.useEffect(() => {setRawTerm(term)}, [term])

  return (
    <div className="flex flex-col gap-4 my-4">
      <h2 className="text-xl font-bold text-gray-800">
        {!enrichmentResults?.currentBackground?.enrich ?
          <div className="flex items-center">
            <Loading className="mr-2" />
            Analyzing gene sets...
          </div>
          : 
          <div className="flex items-center space-x-2">
            <span>Found {Intl.NumberFormat("en-US", {}).format(enrichmentResults?.currentBackground?.enrich?.totalCount || 0)} significant matches in</span>
            <Stats show_gene_sets />
            <Image className="rounded" src="/images/rummagene_logo.png" width={30} height={30} alt="Rummagene" />
          </div>
        }
      </h2>
      <form
        className="flex items-center space-x-2"
        onSubmit={evt => {
          evt.preventDefault()
          setQueryString({ page: '1', q: rawTerm })
        }}
      >
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={rawTerm}
            onChange={evt => {setRawTerm(evt.currentTarget.value)}}
            placeholder="Search results..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FiSearch size={20} />
          </button>
        </div>
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={() => setQueryString({ page: '1', q: '' })}
        >
          <FiX size={20} />
        </button>
        <a href={`/enrich/download?dataset=${queryString.dataset}&q=${queryString.q}`} download="results.tsv" className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none">
          <FiDownload size={20} />
        </a>
      </form>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Paper', 'Title', 'Table', 'Column', 'Gene Set Size', 'Overlap', 'Odds', 'PValue', 'AdjPValue'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!enrichmentResults?.currentBackground?.enrich ?
              <tr>
                <td colSpan={9} className="px-6 py-4 whitespace-nowrap">
                  <Loading />
                </td>
              </tr>
            : null}
            {enrichmentResults?.currentBackground?.enrich?.nodes?.flatMap((enrichmentResult, genesetIndex) => {
              if (!enrichmentResult?.geneSets) return null
              const papers = {} as Record<string, {
                tables: Record<string, { columns: Record<string, typeof enrichmentResult['geneSets']['nodes'][0]>, descriptions: Set<string> }>,
                nTableColumns: number,
                pmcInfoByPmcid: typeof enrichmentResult['geneSets']['nodes'][0]['geneSetPmcsById']['nodes'][0]['pmcInfoByPmcid'],
              }>
              let nPapers = 0
              let nPaperTables = 0
              let nPaperTableColumns = 0
              for (const node of enrichmentResult?.geneSets.nodes) {
                const [paper, _, term] = partition(node.term, '-')
                const m = term ? /^(.+?\.\w+)-+(.+)$/.exec(term) : null
                const table = m ? m[1] : ''
                const column = m ? m[2] : term ?? ''
                if (!(paper in papers)) {
                  papers[paper] = {
                    tables: {},
                    nTableColumns: 0,
                    pmcInfoByPmcid: node.geneSetPmcsById.nodes[0].pmcInfoByPmcid,
                  }
                  nPapers += 1
                }
                if(!(table in papers[paper].tables)) {
                  papers[paper].tables[table] = { columns: {}, descriptions: new Set() }
                  nPaperTables += 1
                }
                papers[paper].tables[table].columns[column] = node
                papers[paper].tables[table].descriptions.add(node.description ?? '')
                papers[paper].nTableColumns += 1
                nPaperTableColumns += 1
              }
              return Object.entries(papers).flatMap(([pmcid, { tables, nTableColumns, pmcInfoByPmcid }], paperIndex) =>
                Object.entries(tables).flatMap(([table, { columns, descriptions }], tableIndex) =>
                  [
                    ...Object.entries(columns).flatMap(([column, geneSet], columnIndex) =>
                      <tr key={`${genesetIndex}-${paperIndex}-${tableIndex}-${columnIndex}`} className="border-b-0">
                        {tableIndex === 0 && columnIndex === 0 ? <th rowSpan={nTableColumns+Object.keys(tables).length}>
                          <a
                            className="underline cursor-pointer"
                            href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${pmcid}/`}
                            target="_blank"
                            rel="noreferrer"
                          >{pmcid}</a>
                        </th> : null}
                        {tableIndex === 0 && columnIndex === 0 ? <td rowSpan={nTableColumns+Object.keys(tables).length}>{pmcInfoByPmcid?.title ?? ''}</td> : null}
                        {columnIndex === 0 ? <td rowSpan={Object.keys(columns).length}>
                          <a
                            className="underline cursor-pointer"
                            href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${pmcid}/bin/${table}`}
                            target="_blank"
                          >
                            <Breakable>{table}</Breakable>
                          </a>
                        </td> : null}
                        <td rowSpan={1}>
                          <label
                            htmlFor="geneSetModal"
                            className="prose underline cursor-pointer"
                            onClick={evt => {
                              setModalGeneSet({
                                type: 'GeneSet',
                                id: geneSet.id,
                                description: geneSet.term ?? '',
                              })
                            }}
                          ><Breakable>{column}</Breakable></label>
                        </td>
                        {paperIndex === 0 && tableIndex === 0 && columnIndex === 0 ? <>
                          <td rowSpan={nPaperTableColumns+nPaperTables} className="whitespace-nowrap text-underline cursor-pointer">
                            {geneSet.nGeneIds}
                          </td>
                          <td rowSpan={nPaperTableColumns+nPaperTables} className="whitespace-nowrap text-underline cursor-pointer">
                            <label
                              htmlFor="geneSetModal"
                              className="prose underline cursor-pointer"
                              onClick={evt => {
                                setModalGeneSet({
                                  type: 'GeneSetOverlap',
                                  id: geneSet.id,
                                  description: `${userGeneSet?.userGeneSet?.description || 'User gene set'} & ${geneSet.term || 'Rummagene gene set'}`,
                                  genes,
                                })
                              }}
                            >{enrichmentResult?.nOverlap}</label>
                          </td>
                          <td rowSpan={nPaperTableColumns+nPaperTables} className="whitespace-nowrap">{enrichmentResult?.oddsRatio?.toPrecision(3)}</td>
                          <td rowSpan={nPaperTableColumns+nPaperTables} className="whitespace-nowrap">{enrichmentResult?.pvalue?.toPrecision(3)}</td>
                          <td rowSpan={nPaperTableColumns+nPaperTables} className="whitespace-nowrap">{enrichmentResult?.adjPvalue?.toPrecision(3)}</td>
                        </> : null}
                      </tr>
                    ),
                    <tr key={`${genesetIndex}-${paperIndex}-${tableIndex}-*`}>
                      <td colSpan={2}><span className="text-gray-700 font-bold">Description:</span> {description_markdown(Array.from(descriptions).filter(description => !!description).join('. '))}</td>
                    </tr>
                  ]
                )
              )
            })}
          </tbody>
        </table>
      </div>
      {enrichmentResults?.currentBackground?.enrich ?
        <div className="w-full flex justify-center mt-4">
          <Pagination
            page={page}
            totalCount={enrichmentResults?.currentBackground?.enrich?.totalCount ? enrichmentResults?.currentBackground?.enrich.totalCount : undefined}
            pageSize={pageSize}
            onChange={page => {
              setQueryString({ page: `${page}`, q: term })
            }}
          />
        </div>
      : null}
    </div>
  )
}

function GeneSetModalWrapper(props: { modalGeneSet: GeneSetModalT, setModalGeneSet: React.Dispatch<React.SetStateAction<GeneSetModalT>> }) {
  const { data: geneSet } = useViewGeneSetQuery({
    skip: props.modalGeneSet?.type !== 'GeneSet',
    variables: props.modalGeneSet?.type === 'GeneSet' ? {
      id: props.modalGeneSet.id,
    } : undefined
  })
  const { data: overlap } = useOverlapQueryQuery({
    skip: props.modalGeneSet?.type !== 'GeneSetOverlap',
    variables: props.modalGeneSet?.type === 'GeneSetOverlap' ?  {
      id: props.modalGeneSet.id,
      genes: props.modalGeneSet?.genes,
    } : undefined,
  })
  const { data: userGeneSet } = useFetchGeneInfoQuery({
    skip: props.modalGeneSet?.type !== 'UserGeneSet',
    variables: props.modalGeneSet?.type === 'UserGeneSet' ? {
      genes: props.modalGeneSet.genes,
    } : undefined,
  })
  return (
    <GeneSetModal
      showModal={props.modalGeneSet !== undefined}
      term={props.modalGeneSet?.description}
      geneset={
        props.modalGeneSet?.type === 'GeneSet' ? geneSet?.geneSet?.genes.nodes
        : props.modalGeneSet?.type === 'GeneSetOverlap' ? overlap?.geneSet?.overlap.nodes
        : props.modalGeneSet?.type === 'UserGeneSet' ?
          userGeneSet?.geneMap2?.nodes ? userGeneSet.geneMap2.nodes.map(({ gene, geneInfo }) => ({gene, ...geneInfo}))
          : props.modalGeneSet.genes.map(symbol => ({ symbol }))
        : undefined
      }
      setShowModal={show => {
        if (!show) props.setModalGeneSet(undefined)
      }}
    />
  )
}

export default function EnrichClientPage({
  searchParams
}: {
  searchParams: {
    dataset: string | string[] | undefined
  },
}) {
  console.log('EnrichClientPage rendered', { searchParams });
  
  const dataset = ensureArray(searchParams.dataset)[0];
  const nodeId = encodeNodeId('user_gene_sets', dataset);

  console.log('Dataset:', dataset);
  console.log('Node ID:', nodeId);
  
  const { data, loading, error } = useFetchUserGeneSetQuery({
    skip: !dataset,
    variables: { nodeId },
  });

  const [modalGeneSet, setModalGeneSet] = React.useState<GeneSetModalT>();

  useEffect(() => {
    console.log('FetchUserGeneSet Query Result:', {
      data: JSON.stringify(data, null, 2),
      loading,
      error: error ? error.message : undefined,
      dataset
    });

    if (!loading) {
      if (error) {
        console.error('FetchUserGeneSet Error:', error);
      } else if (!data) {
        console.log('No data returned from FetchUserGeneSet query');
      } else if (!data.userGeneSet) {
        console.log('userGeneSet is null in the returned data');
      } else {
        console.log('UserGeneSet loaded successfully:', data.userGeneSet);
      }
    }
  }, [loading, error, data, dataset]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.userGeneSet) return <div>No gene set found</div>;


  if (!data.userGeneSet) return <div>No gene set found for ID: {dataset}</div>;

  const userGeneSet = data.userGeneSet;
  const { id, genes, description } = data.userGeneSet;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded" role="alert">
        <div className="flex items-center">
          <span className="font-bold mr-2">Input:</span>
          <label
            htmlFor="geneSetModal"
            className="underline cursor-pointer hover:text-blue-800"
            onClick={evt => {
              setModalGeneSet({
                type: 'UserGeneSet',
                genes: (userGeneSet.genes ?? []).filter((gene): gene is string => !!gene),
                description: userGeneSet.description || 'Gene set',
              })
            }}
          >
            {userGeneSet.description || 'Gene set'}
            {userGeneSet ? <span className="ml-2">({userGeneSet.genes?.length ?? '?'} genes)</span> : null}
          </label>
        </div>
      </div>
      <EnrichmentResults userGeneSet={data} setModalGeneSet={setModalGeneSet} />
      <GeneSetModalWrapper modalGeneSet={modalGeneSet} setModalGeneSet={setModalGeneSet} />
    </div>
  );
}