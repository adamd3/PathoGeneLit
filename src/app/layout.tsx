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
      <body>
        <Header />  
        
        <main className="container mx-auto p-8">
          <MyApolloProvider>
          {children}
          </MyApolloProvider>
        </main>
        
        <Footer />  
      </body>
    </html>
  );
}