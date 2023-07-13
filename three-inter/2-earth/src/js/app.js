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

	const createStar = (count = 500) => {
		const positions = new Float32Array(count * 3);

		for (let i = 0; i < count; i += 1) {
			positions[i] = (Math.random() - 0.5) * 5; // -3~3
			positions[i + 1] = (Math.random() - 0.5) * 5;
			positions[i + 2] = (Math.random() - 0.5) * 5;
		}

		const particleGeometry = new THREE.BufferGeometry();
		particleGeometry.setAttribute(
			'position',
			new THREE.BufferAttribute(positions, 3),
		);

		const particleMaterial = new THREE.PointsMaterial({
			size: 0.01,
			transparent: true,
			depthWrite: false,
			map: textureLoader.load('particle.png'),
			alphaMap: textureLoader.load('particle.png'),
			color: 0xbcc6c6,
		});

		const star = new THREE.Points(particleGeometry, particleMaterial);

		return star;
	};

	const create = () => {
		const earth1 = createEarth1();
		const earth2 = createEarth2();
		const star = createStar();

		scene.add(earth1, earth2, star);

		return {
			earth1,
			earth2,
			star,
		};
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

	const draw = obj => {
		const { earth1, earth2, star } = obj;

		earth1.rotation.x += 0.0005;
		earth1.rotation.y += 0.0005;

		earth2.rotation.x -= 0.0005;
		earth2.rotation.y -= 0.0005;

		star.rotation.x += 0.001;
		star.rotation.y += 0.001;

		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(() => {
			draw(obj);
		});
	};

	const init = async () => {
		addLight();
		const obj = create();
		addEvent();
		resize();
		draw(obj);
	};

	init();
};
