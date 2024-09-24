'use client';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apollo/client';

export default function MyApolloProvider({ children }: { children: React.ReactNode }) {
  const client = useApollo();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
