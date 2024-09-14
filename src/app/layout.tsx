import type { Metadata } from "next";
import Link from 'next/link';
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Create Next App",
  description
  : "Generated by create next app",
};

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
          {children}  {/* Page-specific content goes here */}
        </main>
        
        <Footer />  
      </body>
    </html>
  );
}