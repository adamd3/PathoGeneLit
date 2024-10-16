
import React from 'react'
import Image from 'next/image'
import Stats from '@/app/stats'

export default function Loading() {
  return (
    <>
        <div className="text-center p-5">
        {/* <Image className={'rounded mx-auto'} src={'/images/loading.gif'} width={125} height={250} alt={'Loading...'}/>  */}
        <p>Searching <Stats bold show_gene_sets /> gene sets extracted from <Stats bold show_pmcs /> PubMed articles to find the most similar gene sets that match your query.</p>
        </div>
    </> 
  )
}

