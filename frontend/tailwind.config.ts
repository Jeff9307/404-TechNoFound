import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/app/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0a0a0a',
        'foreground': '#1a1a1a',
        'primary': '#0070f3',
        'primary-foreground': '#ffffff',
        'electric-blue': '#00ffff',
      },
    },
  },
  plugins: [],
};
export default config;
