import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 8175,
		proxy: {
			"/users": {
				target: import.meta.env.VITE_BASE_URL,
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
