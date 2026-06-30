import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    server: {
    port: 3000,
  },  
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return
          if (id.includes("recharts") || /\/d3-[^/]+\//.test(id)) return "charts"
          if (id.includes("@radix-ui")) return "radix"
          if (id.includes("@tanstack")) return "tanstack"
          if (id.includes("@tiptap") || id.includes("prosemirror")) return "editor"
          if (id.includes("framer-motion")) return "motion"
          if (id.includes("lodash")) return "lodash"
          if (id.includes("date-fns") || id.includes("dayjs")) return "date"
          if (id.includes("react-hook-form")) return "forms"
          if (id.includes("react-day-picker")) return "date"
          if (id.includes("lucide-react")) return "icons"
          if (
            /\/node_modules\/(react|react-dom|scheduler)\//.test(id) ||
            id.includes("react-router")
          )
            return "react-vendor"
        },
      },
    },
  },
})