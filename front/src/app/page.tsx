'use client'

import { toast } from 'sonner';
import {Button} from "@nextui-org/react";

export default function Home() {


  return (
    <main className="flex flex-1 p-4 bg-bg">
      <Button onClick={() => toast('My first toast')}>Btn</Button>
    </main>
  );
}
