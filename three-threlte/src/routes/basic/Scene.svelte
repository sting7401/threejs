<script>
	import { RepeatWrapping } from 'three';
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';

	// 이미지 경로 확인
	const img = '/src/lib/images/FloorsCheckerboard_S_Diffuse.jpg'; // 경로를 명확히 지정
	const texture = useTexture(img, {
		transform: (texture) => {
			texture.wrapS = RepeatWrapping;
			texture.wrapT = RepeatWrapping;
			texture.repeat.set(1, 1);
			return texture;
		}
	});
</script>

{#await texture then map}
	<T.Mesh>
		<T.SphereGeometry />
		<T.MeshBasicMaterial {map} />
	</T.Mesh>
{:catch error}
	<p>Error loading texture: {error.message}</p>
{/await}
