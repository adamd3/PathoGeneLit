'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useStatsQuery } from '@/generated/graphql';
import Image from 'next/image'
import Enrichment from '@/components/Enrichment';

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

  const { data: statsData, loading: statsLoading, error: statsError } = useStatsQuery();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-turquoise w-full text-white py-16 px-8 text-center shadow-lg min-h-[350px]">
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          }}
        >
        <Image src={`/logo.jpeg`} alt={'PathoGeneLit'} width="170" height="170" />
        </div>
        
          {!statsLoading && statsData && (
            <p className="space-y-4 text-2xl text-white text-center">
              Pathogen gene sets and metadata from the scientific literature. <br />
              Currently hosting <span className="font-semibold">{parseInt(statsData.allGeneSets?.totalCount).toLocaleString()}</span> unique gene sets
              harvested from a scan of <span className="font-semibold">{parseInt(statsData.pmcStats?.nPublicationsProcessed).toLocaleString()}</span> total publications.
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="w-full max-w-lg p-6 bg-gray-900 shadow-lg rounded-lg text-center min-h-[200px]">
            <Enrichment />
          </div>
        </div>
      </div>


    </div>
  );
}