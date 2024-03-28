'use client';

import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import ModalItem from '@/components/ModalItem/ModalItem';
import { useDisclosure } from '@nextui-org/react';
import { GET_USER_ITEM } from '@/api/query/item';
import { useMutation, useQuery } from '@apollo/client';
import { ITEMS_DELETE } from '@/api/mutation/item';

const TableCollections = dynamic(
  () => import('@/components/TableCollections/TableCollections'),
  { ssr: false }
);

export default function Collections() {
  const controlModalItem = useDisclosure();
  const { data: itemsState, refetch: refetchItems } = useQuery(GET_USER_ITEM, {
    fetchPolicy: 'network-only',
    ssr: false,
    pollInterval: 1000,
  });

  const [deleteItems] = useMutation(ITEMS_DELETE);

  const deleteItem = async (itemId: string) => {
    deleteItems({
      variables: {
        itemIds: [itemId],
      },
    });
  };

  return (
    <div className={styles.page}>
      <TableCollections
        itemsState={itemsState?.userItems}
        refetchItems={refetchItems}
        deleteItem={deleteItem}
        onOpenModalAddItem={controlModalItem.onOpen}
      />
      <ModalItem {...controlModalItem} />
    </div>
  );
}
