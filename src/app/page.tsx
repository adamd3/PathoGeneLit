'use client';

import { useEffect, useState } from 'react';
import { useStatsQuery } from '@/generated/graphql';

export default function Home() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the Python API
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

  // Fetch summary stats from the GraphQL API
  const { data: statsData, loading: statsLoading, error: statsError } = useStatsQuery();

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">PathoGeneLit</h1>
      <p className="text-lg mb-8">
        A web app facilitating the functional analysis of the open access 
        literature on pathogen genes.
      </p>

      {/* Existing Data Fetching from Python API */}
      <div className="my-8">
        {data ? <p>{data}</p> : <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Summary Stats from GraphQL API */}
      <div className="my-8">
        <h2 className="text-2xl font-bold">Summary Stats</h2>
        {statsLoading && <p>Loading stats...</p>}
        {statsError && <p className="text-red-500">Error: {statsError.message}</p>}
        {!statsLoading && statsData && (
          <ul>
            <li>Total User Gene Sets: {statsData.userGeneSets?.totalCount}</li>
            <li>Total Gene Sets: {statsData.geneSets?.totalCount}</li>
            <li>Total PMCs: {statsData.pmcs?.totalCount}</li>
            <li>Publications Processed: {statsData.pmcStats?.nPublicationsProcessed}</li>
          </ul>
        )}
      </div>
    </div>
  );
}
