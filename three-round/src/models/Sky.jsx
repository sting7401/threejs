import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';

import skyeScene from '../assets/3d/sky.glb';
import { useFrame } from '@react-three/fiber';

function Sky({ isRotating }) {
	const sky = useGLTF(skyeScene);
	const skyRef = useRef();

	useFrame((_, delta) => {
		if (isRotating) {
			skyRef.current.rotation.y += 0.24 * delta;
		}
	});

	return (
		<mesh ref={skyRef}>
			<primitive object={sky.scene}></primitive>
		</mesh>
	);
}

export default Sky;
