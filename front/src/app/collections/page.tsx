'use client';

import styles from './page.module.scss';
import dynamic from 'next/dynamic';

const TableCollections = dynamic(
  () => import('@/components/TableCollections/TableCollections'),
  { ssr: false }
);

export default function Collections() {
  const deleteItem = async (itemId: string) => {};
  const onOpenModalAddItem = () => {};

  return (
    <div className={styles.page}>
      <TableCollections
        deleteItem={deleteItem}
        onOpenModalAddItem={onOpenModalAddItem}
      />
    </div>
  );
}
