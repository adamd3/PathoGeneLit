import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white text-black p-6">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold tracking-wide">
          PathoGeneLit
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/enrichment" className="text-lg hover:text-gray-400 transition-colors">
              Enrichment
            </Link>
          </li>
          <li>
            <Link href="/search" className="text-lg hover:text-gray-400 transition-colors">
              Search
            </Link>
          </li>
          <li>
            <Link href="/download" className="text-lg hover:text-gray-400 transition-colors">
              Download
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-lg hover:text-gray-400 transition-colors">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
