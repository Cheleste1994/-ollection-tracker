'use client';

import { PropsWithChildren } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apollo-client';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProvider client={apolloClient}>
      <NextUIProvider
        className={`flex flex-nowrap h-[100vh] w-full overflow-hidden bg-bg dark:bg-slate-900`}
      >
        <ThemeProvider attribute="class" defaultTheme='dark'>{children}</ThemeProvider>
      </NextUIProvider>
    </ApolloProvider>
  );
}
