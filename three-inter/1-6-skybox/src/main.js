import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GUI } from 'lil-gui';

const init = async () => {
	const gui = new GUI();

	const renderer = new THREE.WebGLRenderer({
		// alpha: true,
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// scene
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		10000,
	);

	// camera
	camera.position.z = 100;

	/* 텍스처 배열 이용한 구현 */
	// const controls = new OrbitControls(camera, renderer.domElement);
	// controls.minDistance = 5;
	// controls.maxDIstance = 100;

	// const textureLoader = new THREE.TextureLoader().setPath(
	// 	'assets/texture/football/',
	// );
	// const images = [
	// 	'posx.jpg',
	// 	'negx.jpg',
	// 	'posy.jpg',
	// 	'negy.jpg',
	// 	'posz.jpg',
	// 	'negz.jpg',
	// ];

	// // geometry
	// const geometry = new THREE.BoxGeometry(5000, 5000, 5000);
	// const materials = images.map(
	// 	image =>
	// 		new THREE.MeshBasicMaterial({
	// 			map: textureLoader.load(image),
	// 			side: THREE.BackSide,
	// 		}),
	// );

	// const skyBox = new THREE.Mesh(geometry, materials);
	// scene.add(skyBox);

	/* 큐뷰맵 텍스처 */
	// const controls = new OrbitControls(camera, renderer.domElement);
	// controls.minDistance = 5;
	// controls.maxDIstance = 100;

	// const cubeTextureLoader = new THREE.CubeTextureLoader().setPath(
	// 	'assets/texture/football/',
	// );
	// const images = [
	// 	'posx.jpg',
	// 	'negx.jpg',
	// 	'posy.jpg',
	// 	'negy.jpg',
	// 	'posz.jpg',
	// 	'negz.jpg',
	// ];
	// const cubeTexture = await cubeTextureLoader.loadAsync(images);

	// scene.background = cubeTexture;

	/* 360 파노라마를 이용 */

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableZoom = false;
	controls.enableDamping = true;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 0.5;
	controls.minDistance = 5;
	controls.maxDIstance = 100;

	const textureLoader = new THREE.TextureLoader();
	const texture = await textureLoader
		.loadAsync()
		.setPath('./assets/texture/room/');
	texture.mapping = THREE.EquirectangularRefractionMapping;
	scene.background = texture;

	const sphereGeometry = new THREE.SphereGeometry(30, 50, 50);
	const sphereMaterial = new THREE.MeshBasicMaterial({
		envMap: texture,
		reflectivity: 1,
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	scene.add(sphere);

	// renderer
	const render = () => {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	};

	gui.add(texture, 'mapping', {
		Reflection: THREE.EquirectangularReflectionMapping,
		Reflaction: THREE.EquirectangularRefractionMapping,
	}).onChange(() => {
		sphereMaterial.needsUpdate = true;
	});
	gui.add(sphereMaterial, 'reflectivity').min(0).max(1).step(0.01);
	gui.add(sphereMaterial, 'refractionRatio').min(0).max(1).step(0.01);

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
