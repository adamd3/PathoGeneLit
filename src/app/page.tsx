'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useStatsQuery } from '@/generated/graphql';
import Enrichment from '@/components/Enrichment';
import Image from 'next/image'

export default function Home() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const { data: statsData, loading: statsLoading, error: statsError } = useStatsQuery();

  return (
<div className="min-h-screen flex items-center justify-center">
  <div className="flex flex-row w-full justify-between items-start px-8 py-16 gap-8">
    <div className="flex-1 w-full text-white py-16 px-8 text-center min-h-[350px]">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image src={`/logo.jpeg`} alt={'PathoGeneLit'} width="120" height="120" />
      </div>

      {!statsLoading && statsData && (
        <p className="space-y-4 text-2xl text-white text-center"> <br />
          Currently hosting <span className="font-semibold">{parseInt(statsData.allGeneSets?.totalCount).toLocaleString()}</span> unique gene sets
          harvested from a scan of <span className="font-semibold">{parseInt(statsData.pmcStats?.nPublicationsProcessed).toLocaleString()}</span> total publications.
        </p>
      )}
    </div>

    <div className="flex-1 max-w-lg p-6 bg-dark-grey rounded-lg min-h-[200px]">
      <Enrichment />
    </div>
  </div>
</div>

  );
}