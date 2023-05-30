import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
const init = () => {
	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// scene
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

	// camera
	camera.position.z = 5;

	// renderer
	const clock = new THREE.Clock();
	const render = () => {
		const elapsedTime = clock.getElapsedTime();
		const deltaTime = clock.getDelta();

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	};

	render();

	const handleResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	};

	window.addEventListener('resize', handleResize);
};


window.addEventListener('load', () => {
	init();
});
