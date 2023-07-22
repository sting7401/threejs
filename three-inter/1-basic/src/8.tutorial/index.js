import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import GUI from 'lil-gui';

const init = () => {
	const renderer = new THREE.WebGLRenderer({
		alpha: false,
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		1000,
	);

	scene.add(camera);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	const axesHelper = new THREE.AxesHelper(2);

	scene.add(axesHelper);

	camera.position.set(0, 2, 5);

	const boxGeometry = new THREE.BoxGeometry();
	const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	const box = new THREE.Mesh(boxGeometry, boxMaterial);
	scene.add(box);

	const clock = new THREE.Clock();
	const animate = time => {
		const elapsedTime = clock.getElapsedTime();

		box.rotation.x = Math.cos(elapsedTime);
		box.rotation.y = Math.sin(elapsedTime);

		renderer.render(scene, camera);

		window.requestAnimationFrame(animate);
	};

	animate();
};

window.addEventListener('load', () => {
	init();
});

export default init;
