import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">PathoGeneDB</h1>
      <p className="text-lg mb-8">
        A web application for functional enrichment using the publically available 
        pathogen gene literature.
      </p>

      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/enrichment">
              <a className="text-lg text-blue-600 hover:underline">Gene List Enrichment</a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a className="text-lg text-blue-600 hover:underline">Search Research Articles</a>
            </Link>
          </li>
          <li>
            <Link href="/download">
              <a className="text-lg text-blue-600 hover:underline">Download Data</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="text-lg text-blue-600 hover:underline">About the App</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
