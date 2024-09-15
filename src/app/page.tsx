"use client"; 

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/python");
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const text = await response.text();
        setData(text);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">PathoGeneLit</h1>
      <p className="text-lg mb-8">
        A web app facilitating the functional analysis of the open access 
        literature on pathogen genes. 
      </p>

      <div className="my-8">
        {data ? <p>{data}</p> : <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
