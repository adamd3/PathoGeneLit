'use client'
import React from 'react'
import example from '../app/example.json'
import uniqueArray from '@/utils/uniqueArray'
import { useAddUserGeneSetMutation } from '@/generated/graphql'
import { useRouter } from 'next/navigation'
import { FiUpload, FiSend } from 'react-icons/fi'

const Enrichment = () => {
  const router = useRouter()
  const [rawGenes, setRawGenes] = React.useState('')
  const genes = React.useMemo(() => uniqueArray(rawGenes.split(/[;,\t\r\n\s]+/).filter(v => v)), [rawGenes])
  const [addUserGeneSetMutation, { loading, error }] = useAddUserGeneSetMutation()
  const fileReader = React.useRef<FileReader | null>(null);

  const handleFileRead = React.useCallback(() => {
      const content = fileReader!.current!.result as string;
      setRawGenes(content!);
  }, [setRawGenes])

  const handleFileChosen = React.useCallback((file: File | null) => {
      fileReader.current = new FileReader();
      fileReader.current.onloadend = handleFileRead;
      console.log(file)
      fileReader.current.readAsText(file!);
  }, [handleFileRead]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gene Set Enrichment Analysis</h1>
      <p className="text-lg mb-4 text-gray-600">
        Input your gene set below or try our{' '}
        <button
          className="text-medium-purple font-semibold hover:text-light-purple transition duration-300"
          onClick={() => setRawGenes(example.genes.join('\n'))}
        >
          example set
        </button>.
      </p>
      <form
        className="space-y-6"
        onSubmit={async (evt) => {
          evt.preventDefault()
          const result = await addUserGeneSetMutation({
            variables: {
              genes,
            }
          })
          const id = result.data?.addUserGeneSet?.userGeneSet?.id
          if (id) {
            router.push(`/results?dataset=${id}`)
          }
        }}
       >
        <div className="space-y-2">
          <textarea
            value={rawGenes}
            onChange={evt => setRawGenes(evt.currentTarget.value)}
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 bg-white text-gray-900"
            placeholder="Paste a set of gene names or locus tags here (one per line)"
          />
          <p className="text-sm text-gray-500">{genes.length} gene(s) entered</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition duration-300">
            <FiUpload className="text-lg" />
            <span>Upload File</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChosen(e.target.files?.[0] || null)}
            />
          </label>
          
          <button 
            type="submit"
            className="flex items-center space-x-2 px-6 py-2 bg-medium-purple text-white rounded-md hover:bg-light-purple transition duration-300"
            disabled={loading}
          >
            <FiSend className="text-lg" />
            <span>Submit</span>
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p>{error.message}</p>
          </div>
        )}
      </form>
    </div>
  )
};

export default Enrichment;