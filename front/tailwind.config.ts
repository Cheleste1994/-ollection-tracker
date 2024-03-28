import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import { COLORS } from './src/constants/colors.constants';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-to-b-light':
          'linear-gradient(to bottom, #764ba2, #667eea)',
        'gradient-to-b-dark':
          'linear-gradient(to bottom, #0f172a, #334155)',
      },
      colors: COLORS,
      boxShadow: {
        'shadowLight': '20px 20px 20px 1px rgba(0, 0, 0, 0.4)',
        'shadowDark': '20px 40px 20px 1px rgba(255, 255, 255, 0.4)',
      }
    },
  },
  darkMode: 'selector',
  plugins: [nextui()],
};
export default config;
