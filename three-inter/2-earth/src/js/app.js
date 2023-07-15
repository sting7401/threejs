import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { convertPosition, getGradientCanvas } from './utils.js';

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
	controls.enableDamping = true; // 스무스한 움직임
	controls.dampingFactor = 0.1; // 스무스한 움직임

	const addLight = () => {
		const light = new THREE.DirectionalLight(0xffffff);
		const light2 = new THREE.AmbientLight(0xffffff);
		light2.position.set(2.65, 2.13, 1.02);

		scene.add(light2);
	};

	const createEarth1 = () => {
		const img = textureLoader.load('earth-night-map.jpg');
		const material = new THREE.MeshStandardMaterial({
			map: img,
			roughness: 0,
			metalness: 0,
			opacity: 0.6,
			transparent: true,
		});
		const geometry = new THREE.SphereGeometry(1.3, 30, 30);
		const mesh = new THREE.Mesh(geometry, material);

		mesh.rotation.y = -Math.PI / 2;

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

		mesh.rotation.y = -Math.PI / 2;

		return mesh;
	};

	const createSun = () => {
		const img = textureLoader.load('2k_sun.jpg');
		const material = new THREE.MeshStandardMaterial({
			map: img,
			opacity: 0.9,
			transparent: true,
			side: THREE.BackSide,
		});
		const geometry = new THREE.SphereGeometry(10, 30, 30);
		const mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(10, 10, 10);

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
			color: 0xffffff,
		});

		const star = new THREE.Points(particleGeometry, particleMaterial);

		return star;
	};

	const createPoint1 = () => {
		const seoulPoint = {
			lat: 37.56668 * (Math.PI / 180),
			lng: 126.97841 * (Math.PI / 180),
		};

		const position = convertPosition(seoulPoint, 1.3);

		const mesh = new THREE.Mesh(
			new THREE.TorusGeometry(0.02, 0.002, 20, 20),
			new THREE.MeshBasicMaterial({ color: 0x263d64 }),
		);

		mesh.position.set(position.x, position.y, position.z);

		mesh.rotation.set(0.9, 2.46, 1);

		return mesh;
	};

	const createPoint2 = () => {
		const seoulPoint = {
			lat: 5.55363 * (Math.PI / 180),
			lng: -0.196481 * (Math.PI / 180),
		};

		const position = convertPosition(seoulPoint, 1.3);

		const mesh = new THREE.Mesh(
			new THREE.TorusGeometry(0.02, 0.002, 20, 20),
			new THREE.MeshBasicMaterial({ color: 0x263d64 }),
		);

		mesh.position.set(position.x, position.y, position.z);

		return mesh;
	};

	const createCurve = (position1, position2) => {
		const points = [];

		for (let i = 0; i <= 100; i += 1) {
			const position = new THREE.Vector3().lerpVectors(
				position1,
				position2,
				i / 100,
			);

			position.normalize();

			const wave = Math.sin((Math.PI * i) / 100);

			position.multiplyScalar(1.3 + 0.4 * wave);

			points.push(position);
		}
		const curve = new THREE.CatmullRomCurve3(points);
		// const curve = new THREE.CatmullRomCurve3([
		// 	position1,
		// 	position2,
		// 	// new THREE.Vector3(-3, 0, 0),
		// 	// new THREE.Vector3(0, 3, 0),
		// 	// new THREE.Vector3(3, 0, 0),
		// ]);

		const gradientCanvas = getGradientCanvas('#757f94', '#263d74');
		const texture = new THREE.CanvasTexture(gradientCanvas);

		const geometry = new THREE.TubeGeometry(curve, 20, 0.003);
		const material = new THREE.MeshBasicMaterial({ map: texture });

		const mesh = new THREE.Mesh(geometry, material);

		return mesh;
	};

	const create = () => {
		const earthGroup = new THREE.Group();

		const earth1 = createEarth1();
		const earth2 = createEarth2();
		const sun = createSun();
		const star = createStar();
		const point1 = createPoint1();
		const point2 = createPoint2();
		const curve = createCurve(point1.position, point2.position);

		earthGroup.add(earth1, earth2, point1, point2, curve);

		scene.add(earthGroup, star, sun);

		return {
			earthGroup,
			sun,
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
	const clock = new THREE.Clock();

	const draw = obj => {
		const elapsedTime = clock.getElapsedTime();
		const deltaTime = clock.getDelta();

		const { earthGroup, star, sun } = obj;

		earthGroup.rotation.x -= elapsedTime * 0.00005;
		earthGroup.rotation.y -= elapsedTime * 0.00005;

		star.rotation.x += elapsedTime * 0.00001;
		star.rotation.y += elapsedTime * 0.00001;

		sun.rotation.x += elapsedTime * 0.00001;
		sun.rotation.z += elapsedTime * 0.00001;

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
