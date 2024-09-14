import { useState, ChangeEvent, FormEvent } from 'react';

const Enrichment = () => {
  const [file, setFile] = useState<File | null>(null);
  const [geneList, setGeneList] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('geneList', geneList);
    }
    // Post the formData to your backend API
  };

  return (
    <div>
      <h1>Gene List Enrichment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Upload a file:
          <input type="file" onChange={handleFileChange} />
        </label>
        <p>Or paste your gene list:</p>
        <textarea
          value={geneList}
          onChange={(e) => setGeneList(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Enrichment;
