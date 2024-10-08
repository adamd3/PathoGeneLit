import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-dark-grey p-6">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <Link href="/" className="mb-4 text-2xl text-white hover:text-medium-purple font-extrabold tracking-wide">
               PathoGeneLit
          </Link> 
          <ul className="flex space-x-6">
            <li>
              <Link href="/enrichment" className="text-l text-white hover:text-medium-purple transition-colors">
                Enrichment
              </Link>
            </li>
            <li>
              <Link href="/search" className="text-l text-white hover:text-medium-purple transition-colors">
                Search
              </Link>
            </li>
            <li>
              <Link href="/download" className="text-l text-white hover:text-medium-purple transition-colors">
                Download
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-l text-white hover:text-medium-purple transition-colors">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
