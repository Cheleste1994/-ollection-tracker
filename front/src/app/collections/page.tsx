'use client';

import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import ModalItem from '@/components/ModalItem/ModalItem';
import { useDisclosure } from '@nextui-org/react';

const TableCollections = dynamic(
  () => import('@/components/TableCollections/TableCollections'),
  { ssr: false }
);

export default function Collections() {
  const controlModalItem = useDisclosure();


  const deleteItem = async (itemId: string) => {};

  return (
    <div className={styles.page}>
      <TableCollections
        deleteItem={deleteItem}
        onOpenModalAddItem={controlModalItem.onOpen}
      />
      <ModalItem {...controlModalItem} />
    </div>
  );
}
