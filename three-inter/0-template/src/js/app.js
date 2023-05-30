import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

export default () => {
	const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

	const container = document.querySelector('#container');

	container.insertAdjacentElement('afterbegin', renderer.domElement);

	const canvasSize = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	renderer.setSize(canvasSize.width, canvasSize.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(
		75,
		canvasSize.width / canvasSize.height,
		0.1,
		100,
	);

	camera.position.set(0, 0, 3);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enabledDamping = true;
	controls.dampingFactor = 0.1;

	const create = () => {
		const geometry = new THREE.PlaneGeometry(1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x999ff9 });
		const mesh = new THREE.Mesh(geometry, material);

		scene.add(mesh);
	};

	const resize = () => {
		canvasSize.width = window.innerWidth;
		canvasSize.height = window.innerHeight;

		camera.aspect = canvasSize.width / canvasSize.height;
		camera.updateProjectionMatrix();

		renderer.setSize(canvasSize.width, canvasSize.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	};

	const addEvent = () => {
		window.addEventListener('resize', () => {
			resize();
		});
	};

	const draw = () => {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(() => {
			draw();
		});
	};

	const init = () => {
		create();
		addEvent();
		resize();
		draw();
	};

	init();
};
