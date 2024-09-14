import { useState, ChangeEvent, FormEvent } from 'react';

interface UploadFormProps {
  onSubmit: (formData: FormData) => void;
}

const UploadForm = ({ onSubmit }: UploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [geneList, setGeneList] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('geneList', geneList);
    }
    onSubmit(formData);
  };

  return (
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
  );
};

export default UploadForm;
