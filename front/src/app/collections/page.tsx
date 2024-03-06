import NavbarMenu from '@/components/NavbarMenu/NavbarMenu';
import TableItems from '@/components/Table/Table';

export default function page() {
  return (
    <main className="flex flex-1 bg-bg flex-nowrap relative w-full">
      <NavbarMenu />
      <TableItems />
    </main>
  );
}
