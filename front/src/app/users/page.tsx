import styles from './page.module.scss';
import dynamic from 'next/dynamic'

const TableItems = dynamic(
  () => import('@/components/Table/Table'),
  { ssr: false }
)

export default function Users() {
  return (
    <div className={styles.page}>
      <TableItems />
    </div>
  );
}
