import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,eot,ttf,woff,woff2,mp3}']
			  },
			manifest: {
				name: "Minecraft Multiplayer Screen",
				short_name: "Server List",
				theme_color: "#221811",
				background_color: "#221811",
			},
			devOptions: {
				enabled: false,
			},
		}),
	],
});
