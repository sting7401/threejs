import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const init = async () => {
	const canvas = document.querySelector('#canvas');
	const renderer = new THREE.WebGLRenderer({
		//	alpha: true,
		antialias: true,
		canvas,
	});

	// const gui = new GUI();
	const clock = new THREE.Clock();

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	const scene = new THREE.Scene();

	// camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		500,
	);
	camera.position.set(0, 0, 5);

	// controls

	new OrbitControls(camera, renderer.domElement);

	const geometry = new THREE.SphereGeometry();
	const material = new THREE.PointsMaterial({
		color: 0xccaaff,
		size: 0.01,
		sizeAttenuation: true,
	});
	const points = new THREE.Points(geometry, material);

	scene.add(points);

	// renderer
	const render = () => {
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
