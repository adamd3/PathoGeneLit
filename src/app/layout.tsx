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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="container max-w-screen-xl mx-auto p-8 bg-dark-grey">
        <Header />  
        
        <main>
          <MyApolloProvider>
          {children}
          </MyApolloProvider>
        </main>
        
        <Footer />  
      </body>
    </html>
  );
}