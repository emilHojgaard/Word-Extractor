import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()], // Add the React plugin
    build: {
        rollupOptions: {
            input: {
                contentScript: resolve(__dirname, "src/contentScript.jsx"),
                background: resolve(__dirname, "src/background.js"),
            },
            output: {
                entryFileNames: "[name].js",
            },
        },
    },
    publicDir: "public", // Ensure manifest.json and icons are copied
});