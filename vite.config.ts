import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = {
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/tests/**/*.test.ts", "src/tests/**/*.test.tsx"],
    setupFiles: []
  }
};

export default defineConfig(config);
