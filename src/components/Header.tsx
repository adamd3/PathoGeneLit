import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">
          <a className="text-lg font-bold">Gene Enrichment App</a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/enrichment">
              <a className="hover:underline">Enrichment</a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a className="hover:underline">Search</a>
            </Link>
          </li>
          <li>
            <Link href="/download">
              <a className="hover:underline">Download</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="hover:underline">About</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
