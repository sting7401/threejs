import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

import Firework from './Firework.js';

const init = async () => {
	const canvas = document.querySelector('#canvas');
	const renderer = new THREE.WebGLRenderer({
		//	alpha: true,
		antialias: true,
		canvas,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	const scene = new THREE.Scene();

	// camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		10000,
	);
	camera.position.z = 8000;

	const fireworks = [];

	fireworks.update = function () {
		for (let index = 0; index < this.length; index += 1) {
			const firework = fireworks[index];

			firework.update();
		}
	};

	let firework = new Firework({ x: 0, y: 0 });

	scene.add(firework.points);

	fireworks.push(firework);

	// renderer
	const render = () => {
		fireworks.update();

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	};

	render();

	const handleResize = () => {
		firework.update();
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	};

	const handleMouseDown = () => {
		firework = new Firework({
			x: THREE.MathUtils.randFloatSpread(8000),
			y: THREE.MathUtils.randFloatSpread(8000),
		});

		scene.add(firework.points);

		fireworks.push(firework);
	};

	window.addEventListener('resize', handleResize);
	window.addEventListener('mousedown', handleMouseDown);
};

window.addEventListener('load', () => {
	init();
});
