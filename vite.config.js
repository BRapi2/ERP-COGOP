import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => { 
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Provide VITE_API_URL under process.env for code that expects process.env.VITE_API_URL
    // Vite also exposes env vars via import.meta.env.VITE_API_URL — prefer that when possible.
    define: {
      'process.env': {
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
      },
    },
  };
});