import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-turquoise p-6">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <Link href="/" className="mb-4 text-2xl text-white font-extrabold tracking-wide">
              Pathogen Gene Literature
          </Link> 
          <ul className="flex space-x-6">
            <li>
              <Link href="/enrichment" className="text-2xl text-black hover:text-turquoise transition-colors">
                Enrichment
              </Link>
            </li>
            <li>
              <Link href="/search" className="text-2xl text-black hover:text-turquoise transition-colors">
                Search
              </Link>
            </li>
            <li>
              <Link href="/download" className="text-2xl text-black hover:text-turquoise transition-colors">
                Download
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-2xl text-black hover:text-turquoise transition-colors">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
