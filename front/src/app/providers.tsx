'use client'

import { PropsWithChildren } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apollo-client';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProvider client={apolloClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </ApolloProvider>
  );
}
