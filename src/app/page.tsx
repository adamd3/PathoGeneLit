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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Main Header Section */}
      <section className="bg-amber-400 w-full text-white py-16 px-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Pathogen gene literature resource</h1>
        <p className="text-xl font-light max-w-2xl mx-auto">

          {!statsLoading && statsData && (
            <ul className="space-y-4 text-lg text-black">
              Hosting <span className="font-semibold">{parseInt(statsData.allGeneSets?.totalCount).toLocaleString()}</span> unique gene sets
              harvested from <span className="font-semibold">{parseInt(statsData.pmcStats?.nPublicationsProcessed).toLocaleString()}</span> publications.
            </ul>
          )}

        </p>
      </section>

      {/* Stats Section */}
      <section className="flex flex-wrap justify-center gap-6 mt-12">
        {/* <div className="w-full max-w-lg p-6 bg-gray-900 shadow-lg rounded-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Summary Stats</h2> */}
          {/* {statsLoading && <p>Loading stats...</p>} */}
          {/* {statsError && <p className="text-red-500">Error: {statsError.message}</p>} */}
          {/* {!statsLoading && statsData && (
            <ul className="space-y-4 text-lg text-gray-300">
              <li>Total User Gene Sets: <span className="font-semibold">{statsData.userGeneSets?.totalCount}</span></li>
              <li>Total Gene Sets: <span className="font-semibold">{statsData.allGeneSets?.totalCount}</span></li>
              <li>Total publications scanned: <span className="font-semibold">{parseInt(statsData.pmcStats?.nPublicationsProcessed).toLocaleString()}</span></li>
            </ul>
          )}
        </div> */}

        {/* Existing Data Fetching from Python API */}
        <div className="w-full max-w-lg p-6 bg-gray-900 shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Latest Data</h2>
          {data ? <p className="text-gray-300">{data}</p> : <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </section>
    </div>
  );
}
