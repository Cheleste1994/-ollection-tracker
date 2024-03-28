import { Button } from '@nextui-org/react';
import { Pencil } from 'lucide-react';
import { SetStateAction } from 'react';
import styles from './TitleControl.module.scss';

type PropsTitle = {
  title: string;
  isOpenUpdate: boolean;
  setIsOpenUpdate: (value: SetStateAction<boolean>) => void;
};

export default function TitleControl(props: PropsTitle) {
  const { isOpenUpdate, setIsOpenUpdate, title } = props;

  return (
    <div className={styles.title}>
      <h2>{title}</h2>
      {isOpenUpdate ? (
        <Button
          color="primary"
          variant="shadow"
          onClick={() => setIsOpenUpdate(false)}
          startContent={<Pencil size={15} />}
        >
          Update
        </Button>
      ) : (
        <Button
          color="primary"
          variant="light"
          type="submit"
          onClick={() => setIsOpenUpdate(true)}
        >
          Сhange
        </Button>
      )}
    </div>
  );
}
