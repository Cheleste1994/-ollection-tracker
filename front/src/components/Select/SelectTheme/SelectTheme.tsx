'use client';

import { ThemeEnum } from '@/types/theme';
import { capitalize } from '@/utils/capitalize';
import { useTheme } from 'next-themes';
import { ChangeEvent } from 'react';

export default function SelectTheme() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ThemeEnum;

    if (value) {
      setTheme(() => ThemeEnum[value]);
      localStorage.setItem('theme', ThemeEnum[value]);
    }
  };

  return (
    <select
      className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
      id="theme"
      name="theme"
      defaultValue={theme || 'light'}
      onChange={handleChangeTheme}
    >
      {Object.values(ThemeEnum).map((value) => (
        <option value={value} key={value}>
          {capitalize(value)}
        </option>
      ))}
    </select>
  );
}
