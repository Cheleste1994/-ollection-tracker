'use client'

import {
  Button,
  Input,
  Image,
  Avatar,
  Select,
  SelectItem,
} from '@nextui-org/react';
import styles from './page.module.scss';

export default function Settings() {
  return (
    <main className={styles.main}>
      <div className={styles.settings}>
        <div className={styles.contacts}>
          <div className={styles.title}>
            Контактная информация:
            <Button color="primary" variant="light">
              Изменить
            </Button>
          </div>
          <Image
            isBlurred
            width={240}
            height={240}
            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            alt="NextUI Album Cover"
            className="max-h-[240px]"
          />
          <div className={styles.form}>
            <Input type="text" variant="underlined" label="First Name" />
            <Input type="text" variant="underlined" label="Last Name" />
            <Input type="text" variant="underlined" label="Gender" />
            <Select className="max-w-xs" label="Select country">
              <SelectItem
                key="argentina"
                startContent={
                  <Avatar
                    alt="Argentina"
                    className="w-6 h-6"
                    src="https://flagcdn.com/ar.svg"
                  />
                }
              >
                Argentina
              </SelectItem>
            </Select>
          </div>
        </div>
      </div>
    </main>
  );
}
