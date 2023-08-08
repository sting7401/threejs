<script>
	import { T, Mesh, useTexture } from '@threlte/core';
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three';
	const map = useTexture('/some/texture');
	const material = new MeshStandardMaterial({ map });
</script>

<T.Mesh dispose={false}>
	<T.BoxGeometry />

	<T.SphereGeometry />
	<T.MeshStandardMaterial map={$map} />
	<T.Mesh dispose>
		<T.BoxGeometry />
		<T.MeshStandardMaterial map={$map} />
	</T.Mesh>
</T.Mesh>
