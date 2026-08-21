import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Set this to "/<repo-name>/" if you deploy to GitHub Pages from a subpath.
  base: "/",
});
