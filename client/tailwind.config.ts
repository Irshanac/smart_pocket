import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kay-pho-du': ['"Kay Pho Du"', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        buttonBackground: "#0D0140",  
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #EFF0FF 0%, #ECEDFB 38%, #C2E0E3 100%)',
        'angular-gradient': 'linear-gradient(45deg, #BEE9FF 0%, #E6E3FD 33%, #BDCAFC 67%, #CCF0E8 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
