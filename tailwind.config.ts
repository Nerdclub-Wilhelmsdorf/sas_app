import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f4f7fb',
          '100': '#e8eef6',
          '200': '#ccdbeb',
          '300': '#9fbdda',
          '400': '#6b9ac5',
          '500': '#487daf',
          '600': '#366393',
          '700': '#2f547d',
          '800': '#284564',
          '900': '#263b54',
          '950': '#192738',
        }
      }
    }
  },
  plugins: [flowbitePlugin]
} as Config;