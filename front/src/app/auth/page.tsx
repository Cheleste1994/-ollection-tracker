'use client';

import FormAuth from '@/components/FormAuth/FormAuth';
import { createPortal } from 'react-dom';
import styles from './page.module.scss';


export default function Auth() {
  return (
    <main className="flex flex-1 justify-center self-center relative">
      <FormAuth />
      {createPortal(
        <div className={styles.bg}><div></div></div>,
        document.body
      )}
    </main>
  );
}
