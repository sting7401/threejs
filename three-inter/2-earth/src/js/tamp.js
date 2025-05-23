import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

export default () => {
	const renderer = new THREE.WebGLRenderer({ alpha: true });

	const container = document.querySelector('#container');

	container.appendChild(renderer.domElement);

	const canvasSize = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	renderer.setSize(canvasSize.width, canvasSize.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75, // 카메라의 시야각
		canvasSize.width / canvasSize.height, // 비율
		0.1, // 카메라와 가까운 거리
		100, // 카메라와 가장 먼 거리
	);
	camera.position.set(0, 0, 3);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.1;

	const createObject = () => {
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const geometry = new THREE.PlaneGeometry(1, 1);
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
		window.addEventListener(
			'resize',
			() => {
				resize();
			},
			false,
		);
	};

	const draw = () => {
		controls.update();
		renderer.render(scene, camera);

		requestAnimationFrame(() => {
			draw();
		});
	};

	const init = () => {
		createObject();
		addEvent();
		resize();
		draw();
	};

	init();
};
