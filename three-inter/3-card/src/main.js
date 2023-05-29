import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import Card from './Card';

import { gsap } from 'gsap';

window.addEventListener('load', () => {
	init();
});

const init = () => {
	const gui = new GUI();

	const COLORS = ['#ff6e6e', '#31e0c1', '#006fff', '#ffd732'];

	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);

	// scene
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		500,
	);

	// camera
	camera.position.set(10, 10, 25);

	const card = new Card({
		width: 10,
		height: 15.8,
		radius: 0.5,
		color: COLORS[0],
	});

	card.mesh.rotation.z = Math.PI * 0.1;
	scene.add(card.mesh);

	gsap.to(card.mesh.rotation, {
		y: -Math.PI * 4,
		duration: 2.5,
		ease: 'back.out(2.5)',
	});

	// light
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
	ambientLight.position.set(-3, 3, -3);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
	const directionalLight2 = directionalLight.clone();

	directionalLight.position.set(1, 1, 3);
	directionalLight2.position.set(-1, 1, -3);
	directionalLight.castShadow = true;
	scene.add(directionalLight, directionalLight2);

	// controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.autoRotate = true;
	controls.autoRotateSpeed = 2.5;
	controls.rotateSpeed = 0.75;
	controls.enableDamping = true;
	controls.enableZoom = false;
	controls.minPolarAngle = Math.PI / 2;
	controls.maxPolarAngle = Math.PI / 2;

	// renderer
	const clock = new THREE.Clock();
	const render = () => {
		const elapsedTime = clock.getElapsedTime();
		const deltaTime = clock.getDelta();

		renderer.render(scene, camera);
		controls.update();
		requestAnimationFrame(render);
	};

	const guiFunc = () => {
		//gui
		const cardFolder = gui.addFolder(`card`);
		cardFolder
			.add(card.mesh.material, 'roughness')
			.min(0)
			.max(1)
			.step(0.01)
			.name('roughness');
		cardFolder
			.add(card.mesh.material, 'metalness')
			.min(0)
			.max(1)
			.step(0.01)
			.name('metalness');

		// const axesHelper = new THREE.AxesHelper(10);
		// scene.add(axesHelper);
	};

	guiFunc();

	render();

	const handleResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	};

	window.addEventListener('resize', handleResize);

	const container = document.querySelector('.container');

	for (const color of COLORS) {
		const button = document.createElement('button');

		button.style.backgroundColor = color;

		container.appendChild(button);

		button.addEventListener('click', () => {
			card.mesh.material.color = new THREE.Color(color);

			gsap.to(card.mesh.rotation, {
				y: card.mesh.rotation.y - Math.PI / 2,
				duration: 2.5,
				ease: 'back.out(2.5)',
			});
		});
	}
};
