import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'MERN Finance Dashboard with ML Predictions',
        short_name: 'ML Dashboard',
        start_url: '/',
        display: 'standalone',
        theme_color: '#4CAF50',
        background_color: '#ffffff',
        icons: [
          {
            src: 'images/image (1).png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'images/image (2).png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Customize Workbox settings if needed
      },
    }),
  ],
});
