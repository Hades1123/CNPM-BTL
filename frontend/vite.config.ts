import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsConfigPath from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPath(), tailwindcss()],
});
