<script>
	import * as threlte from '@theatre/core';
	import { Canvas, T } from '@threlte/core';

	import { Studio } from '@threlte/studio';

	import Scene from './Scene.svelte';
</script>

<div class="container">
	<Canvas>
		<Studio>
			<Scene />
		</Studio>
	</Canvas>
</div>

<style>
	.container {
		overflow: hidden;
		width: 100vw;
		height: 100vh;
	}
</style>
