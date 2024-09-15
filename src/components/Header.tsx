import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg font-bold">
          Gene Enrichment App
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/enrichment" className="hover:underline">
              Enrichment
            </Link>
          </li>
          <li>
            <Link href="/search" className="hover:underline">
              Search
            </Link>
          </li>
          <li>
            <Link href="/download" className="hover:underline">
              Download
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
