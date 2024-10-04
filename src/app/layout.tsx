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
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Outfit:wght@100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
       </head>
      <body className="container max-w-screen-2xl mx-auto p-8 ">
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