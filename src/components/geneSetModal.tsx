import React from 'react'
import { useAddUserGeneSetMutation } from '@/generated/graphql'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import blobTsv from '@/utils/blobTsv'
import clientDownloadBlob from '@/utils/clientDownloadBlob'
import { FiDownload, FiCopy } from 'react-icons/fi';

function ExpandableText({ text }: { text: string }) {
    const [more, setMore] = React.useState(false)
    const startText = React.useMemo(() => text.split('. ')[0], [text])
    if (!text) return null
    return <>
        {more ? text : startText}
        &nbsp;
        {more ? <button className="text-medium-purple" onClick={() => setMore(() => false)}>Show Less</button>
        : <button className="text-medium-purple" onClick={() => setMore(() => true)}>Show More</button>}
    </>
}

const GeneSetModal = ({ geneset, term, showModal, setShowModal }) => {
  const modalRef = React.useRef(null);
  const genes = React.useMemo(() => geneset?.filter((gene): gene is Exclude<typeof gene, null | undefined> & { symbol: string } => !!gene?.symbol).map(({ symbol }) => symbol), [geneset])
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, setShowModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white text-black rounded-lg shadow-xl w-11/12 max-w-4xl h-5/6 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">Gene Set ({geneset?.length || 'n'})</h2>
          <p className="text-gray-600">{term}</p>
        </div>
        <div className="flex-grow overflow-hidden p-4">
          <div className="overflow-x-auto h-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sticky top-0 bg-gray-50 z-10">Gene ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sticky top-0 bg-gray-50 z-10">Gene name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sticky top-0 bg-gray-50 z-10">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {geneset?.map((gene, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{gene.gene}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{gene.symbol}</td>
                    <td className="px-6 py-4">{gene.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
          <button className="btn btn-outline btn-sm flex items-center" onClick={() => {
                if (!geneset) return
                const blob = blobTsv(['symbol', 'description'], geneset, item => ({
                    gene: item?.gene,
                    gene_name: item?.symbol,
                    description: item?.description,
                }))
                clientDownloadBlob(blob, `${term ? term : 'gene_set'}.tsv`)
          }}>
            <FiDownload className="mr-2" /> Download Table
          </button>
          <button className="btn btn-outline btn-sm flex items-center" onClick={(evt) => {
                const currentRef = evt.currentTarget
                const currentColor = currentRef.style.backgroundColor
                currentRef.style.backgroundColor = 'green'
                setTimeout(() => {currentRef.style.backgroundColor = currentColor}, 500)
                navigator.clipboard.writeText(genes?.join('\n') || '')
          }}>
            <FiCopy className="mr-2" /> Copy gene names
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default GeneSetModal;
