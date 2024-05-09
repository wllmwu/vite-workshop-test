import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vite-workshop-test",
  plugins: [{ enforce: "pre", ...mdx() }, react()],
});
