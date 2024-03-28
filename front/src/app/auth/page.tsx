'use client';

import Background from '@/components/Background/Background';
import FormAuth from '@/components/Forms/FormAuth/FormAuth';

export default function Auth() {
  return (
    <main className="flex flex-1 justify-center relative self-center">
      <FormAuth />
      <Background />
    </main>
  );
}
