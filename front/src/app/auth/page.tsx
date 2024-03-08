'use client'

import Background from '@/components/Background/Background';
import FormAuth from '@/components/FormAuth/FormAuth';

export default function Auth() {
  return (
    <main className="flex flex-1 justify-center self-center">
      <FormAuth />
      <Background />
    </main>
  );
}
