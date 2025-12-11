import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const app = process.env.APP || "";

  return {
    plugins: [react()],
    root: `src/apps/${app}`,
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "index.js",
        },
      },
    },
  };
});
