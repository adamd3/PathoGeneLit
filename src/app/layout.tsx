import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyApolloProvider from '@/lib/apollo/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        <Header />
        
        <main className="flex-grow container max-w-screen-xl mx-auto p-8">
          <MyApolloProvider>
            <div className="bg-white shadow-md rounded-lg p-6">
              {children}
            </div>
          </MyApolloProvider>
        </main>
        
        <Footer />
      </body>
    </html>
  );
}