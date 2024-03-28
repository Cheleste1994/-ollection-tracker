import { Button } from '@nextui-org/react';
import { Pencil } from 'lucide-react';
import { SetStateAction, useCallback } from 'react';
import styles from './TitleControl.module.scss';

type PropsTitle = {
  title: string;
  isOpenUpdate: boolean;
  setIsOpenUpdate: (value: SetStateAction<boolean>) => void;
  isAuth: boolean;
};

export default function TitleControl(props: PropsTitle) {
  const { isOpenUpdate, setIsOpenUpdate, title, isAuth } = props;

  const btnControl = useCallback(() => {
    return isOpenUpdate ? (
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
    );
  }, [isAuth, isOpenUpdate, setIsOpenUpdate]);

  return (
    <div className={styles.title}>
      <h2>{title}</h2>

      {isAuth && btnControl()}
    </div>
  );
}
