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

	const controls = new OrbitControls(camera, renderer.domElement);

	const geometry = new THREE.BufferGeometry();

	const count = 1000;

	const positions = new Float32Array(count * 3);
	const colors = new Float32Array(count * 3);

	for (let i = 0; i < count; i += 1) {
		positions[i * 3] = THREE.MathUtils.randFloatSpread(10);
		positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10);
		positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10);

		colors[i * 3] = THREE.MathUtils.randFloatSpread(10);
		colors[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10);
		colors[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10);
	}

	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

	const material = new THREE.PointsMaterial({
		color: 0xccaaff,
		size: 0.1,
		sizeAttenuation: true,
		vertexColors: true,
	});
	const points = new THREE.Points(geometry, material);

	const textureLoader = new THREE.TextureLoader();

	const texture = textureLoader.load('./assets/texture/particle.png');

	material.alphaMap = texture;
	material.transparent = true;
	material.depthWrite = false;

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
