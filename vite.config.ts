import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.REACT_APP_PRODUCTION': JSON.stringify(process.env.REACT_APP_PRODUCTION),
  },
});
