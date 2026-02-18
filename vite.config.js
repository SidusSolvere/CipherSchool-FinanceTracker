import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa"

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssets: [
    '/icons/favicon.ico',
    '/icons/apple-touch-icon.png',
    '/icons/masked-icon.svg'
  ],
  manifest: {
    name: "Teller – Financial Tracker",
    short_name: "Teller",
    description: "Personal financial tracking application",
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
  ...manifestForPlugIn,
  devOptions: {
    enabled: true
  }
})

  ]
})
