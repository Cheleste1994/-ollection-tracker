import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';

type PropsInputUpload = {
  isClick: boolean;
  handleInputUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  setIsClickUpload: Dispatch<SetStateAction<boolean>>;
};

export default function InputUpload({
  isClick,
  handleInputUpload,
  setIsClickUpload,
}: PropsInputUpload) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref.current && isClick) {
      ref.current.click();
      setIsClickUpload(false);
    }
  }, [isClick]);

  return (
    <input
      type={'file'}
      className={'hidden'}
      ref={ref}
      onChange={handleInputUpload}
    />
  );
}
