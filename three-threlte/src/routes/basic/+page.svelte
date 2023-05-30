<script>
	import { Canvas, T } from '@threlte/core';

	import Scene from './Scene.svelte';
</script>

<div class="contaiter">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	.contaiter {
		width: 100vw;
		height: 100vh;
	}
</style>
