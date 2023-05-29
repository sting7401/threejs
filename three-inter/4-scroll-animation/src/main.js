import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const init = async () => {
	gsap.registerPlugin(ScrollTrigger);

	const params = {
		waveColor: '#00ffff',
		backgroundColor: '#ffffff',
		fogColor: '#f0f0f0',
	};

	const canvas = document.querySelector('#canvas');
	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
		canvas,
	});

	// const gui = new GUI();
	const clock = new THREE.Clock();

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	const scene = new THREE.Scene();

	scene.fog = new THREE.Fog(0xf0f0f0, 0.1, 500);

	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		500,
	);

	// scene

	// camera
	camera.position.set(0, 25, 150);

	const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
	const waveMaterial = new THREE.MeshStandardMaterial({
		color: params.waveColor,
	});
	const wave = new THREE.Mesh(waveGeometry, waveMaterial);

	wave.rotation.x = -Math.PI / 2;
	wave.receiveShadow = true;

	const gltfLoader = new GLTFLoader();
	const gltf = await gltfLoader.loadAsync('./models/ship/scene.gltf');
	const ship = gltf.scene;
	ship.castShadow = true;
	ship.traverse(objects => {
		const object = objects;
		if (object.isMesh) {
			object.castShadow = true;
		}
	});

	ship.update = () => {
		const elapsedTime = clock.getElapsedTime();

		ship.position.y = Math.sin(elapsedTime * 3) + 27;
	};

	ship.rotation.y = -Math.PI / 2;
	ship.scale.set(3, 3, 3);
	scene.add(ship);

	const waveHeight = 2.5;
	const initZPosition = [];

	for (let i = 0; i < waveGeometry.attributes.position.count; i += 1) {
		// waveGeometry.attributes.position.array[i + 2] +=
		// 	(Math.random() - 0.5) * waveHeight;

		const z =
			waveGeometry.attributes.position.getZ(i) +
			(Math.random() - 0.5) * waveHeight;

		waveGeometry.attributes.position.setZ(i, z);
		initZPosition.push(z);
	}

	wave.update = () => {
		const elapsedTime = clock.getElapsedTime();
		for (let i = 0; i < waveGeometry.attributes.position.count; i += 1) {
			const z =
				initZPosition[i] +
				Math.sin(elapsedTime * 3 + i ** 2) * waveHeight;

			waveGeometry.attributes.position.setZ(i, z);
		}

		waveGeometry.attributes.position.needsUpdate = true;
	};

	scene.add(wave);

	const pointLight = new THREE.PointLight(0xffffff, 1);
	pointLight.position.set(15, 15, 15);
	pointLight.castShadow = true;
	pointLight.shadow.mapSize.width = 1024;
	pointLight.shadow.mapSize.height = 1024;
	pointLight.shadow.radius = 10;

	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
	directionalLight.position.set(-15, 15, 15);
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;
	directionalLight.shadow.radius = 10;

	scene.add(pointLight);
	scene.add(directionalLight);

	// controls

	// renderer
	const render = () => {
		wave.update();
		ship.update();

		camera.lookAt(ship.position);
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	};

	// gui.add(scene.fog, 'near').min(0).max(100).step(0.01);
	// gui.add(scene.fog, 'far').min(0).max(100).step(0.01);

	render();

	const handleResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	};

	window.addEventListener('resize', handleResize);

	const timeCheck = gsap.timeline({
		scrollTrigger: {
			trigger: '.wrapper',
			start: 'top top',
			end: 'bottom bottom',
			markers: true,
			scrub: true,
		},
	});

	timeCheck
		.to(params, {
			waveColor: '#4268ff',
			onUpdate: () => {
				waveMaterial.color = new THREE.Color(params.waveColor);
			},
			duration: 1.5,
		})
		.to(
			params,
			{
				backgroundColor: '#2a2a2a',
				onUpdate: () => {
					scene.background = new THREE.Color(params.backgroundColor);
				},
				duration: 1.5,
			},
			'<',
		)
		.to(
			params,
			{
				fogColor: '#2f2f2f',
				onUpdate: () => {
					scene.fog.color = new THREE.Color(params.fogColor);
				},
				duration: 1.5,
			},
			'<',
		)
		.to(camera.position, { x: 150, z: -10, duration: 2.5 })
		.to(ship.position, { z: -300, duration: 2.5 })
		.to(camera.position, { x: 0, y: 20, z: -10, duration: 2 })
		.to(camera.position, { x: 50, y: 10, z: 0, duration: 2 });

	gsap.to('.title', {
		opacity: 0,
		scrollTrigger: {
			trigger: '.wrapper',
			scrub: true,
			pin: true,
			end: '+=1000',
		},
	});
};

window.addEventListener('load', () => {
	init();
});
