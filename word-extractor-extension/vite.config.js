import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                contentScript: resolve(__dirname, "src/contentScript.js"),
                background: resolve(__dirname, "src/background.js"),

            },
            output: {
                entryFileNames: "[name].js",
            },
        },
    },
    publicDir: "public", // Ensure manifest.json and icons are copied
});