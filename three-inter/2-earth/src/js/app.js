import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

export default async () => {
	const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.outputColorSpace = THREE.SRGBColorSpace;

	const textureLoader = new THREE.TextureLoader().setPath('./assets/');
	const cubeTextureLoader = new THREE.CubeTextureLoader().setPath(
		'./assets/map/',
	);
	const environmentMap = await cubeTextureLoader.loadAsync([
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png',
	]);

	environmentMap.outputColorSpace = THREE.SRGBColorSpace;

	const container = document.querySelector('#container');

	container.appendChild(renderer.domElement);

	const canvasSize = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	renderer.setSize(canvasSize.width, canvasSize.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	const scene = new THREE.Scene();
	scene.background = environmentMap;

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

	const addLight = () => {
		const light = new THREE.DirectionalLight(0xffffff);
		light.position.set(2.65, 2.13, 1.02);

		scene.add(light);
	};

	const createEarth1 = () => {
		const img = textureLoader.load('earth-night-map.jpg');
		const material = new THREE.MeshStandardMaterial({
			map: img,
			roughness: 0,
			metalness: 0,
			side: THREE.FrontSide,
			opacity: 0.6,
			transparent: true,
		});
		const geometry = new THREE.SphereGeometry(1.3, 30, 30);
		const mesh = new THREE.Mesh(geometry, material);

		return mesh;
	};

	const createEarth2 = () => {
		const img = textureLoader.load('earth-night-map.jpg');
		const material = new THREE.MeshStandardMaterial({
			map: img,
			opacity: 0.9,
			transparent: true,
			side: THREE.BackSide,
		});
		const geometry = new THREE.SphereGeometry(1.5, 30, 30);
		const mesh = new THREE.Mesh(geometry, material);

		return mesh;
	};

	const create = () => {
		const earth1 = createEarth1();
		const earth2 = createEarth2();

		scene.add(earth1, earth2);
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

	const init = async () => {
		addLight();
		create();
		addEvent();
		resize();
		draw();
	};

	init();
};
