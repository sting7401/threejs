import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { threlteStudio } from '@threlte/studio/vite';

export default defineConfig({
	plugins: [tailwindcss(), threlteStudio(), sveltekit()],
	ssr: { noExternal: ['three', 'troika-three-text'] }
});
