import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; 

const Enrichment = () => {
  const [file, setFile] = useState<File | null>(null);
  const [geneList, setGeneList] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const router = useRouter(); 

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setResponseMessage(null);

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('geneList', geneList);
    }

    try {
      const response = await fetch('http://127.0.0.1:5328/api/enrichment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(JSON.stringify(result, null, 2));
        router.push('/results'); // Redirect to /results
      } else {
        setResponseMessage('Failed to communicate with the backend');
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-black mb-6">Gene List Enrichment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-lg text-black mt-4 mb-0 font-medium">Paste a list of genes <br />(one gene per line):</p>
        <textarea
          value={geneList}
          onChange={(e) => setGeneList(e.target.value)}
          rows={6}
          className="border border-gray-300 rounded p-2 w-full text-black"
        />

        <div>
          <label className="block text-lg font-medium text-black mb-2">or upload a file (.txt):</label>
          <input type="file" onChange={handleFileChange} className="border border-gray-300 rounded p-2 w-full" />
          {file && <p className="mt-2 text-black">{file.name}</p>}
        </div>

        <button
          type="submit"
          className="mt-4 text-white font-semibold py-2 px-4 rounded bg-turquoise hover:bg-black"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {responseMessage && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-black">Response:</h2>
          <pre className="text-black whitespace-pre-wrap">{responseMessage}</pre>
        </div>
      )}
    </div>
  );
};

export default Enrichment;
