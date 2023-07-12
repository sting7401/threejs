import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const init = async () => {
	const renderer = new THREE.WebGLRenderer({
		// alpha: true,
		antialias: true,
	});

	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
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
	camera.position.set(0, 5, 20);

	// loading maneger
	const loadingManager = new THREE.LoadingManager();
	const progressContainer = document.querySelector('#progressContainer');
	const progressBar = document.querySelector('#progressBar');

	loadingManager.onProgress = (url, loaded, total) => {
		progressBar.value = (loaded / total) * 100;
	};

	loadingManager.onLoad = () => {
		progressContainer.style.display = 'none';
	};

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.minDistance = 15;
	controls.maxDistance = 25;
	controls.minPolarAngle = Math.PI / 3;
	controls.maxPolarAngle = Math.PI / 4;

	const gltfLoader = new GLTFLoader(loadingManager);
	const gltf = await gltfLoader.loadAsync('./models/character.gltf');

	const model = gltf.scene;
	model.scale.set(0.1, 0.1, 0.1);
	model.traverse(object => {
		if (object.isMesh) {
			object.castShadow = true;
		}
	});

	scene.add(model);
	camera.lookAt(model.position);

	const planeGeometry = new THREE.PlaneGeometry(10000, 10000, 100000);
	const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.rotation.x = -Math.PI / 2;
	plane.position.y = -7.5;
	plane.receiveShadow = true;
	scene.add(plane);

	const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x333333);
	hemisphereLight.position.set(0, 20, 10);
	scene.add(hemisphereLight);

	const spotLight = new THREE.SpotLight(
		0xffffff,
		1.5,
		30,
		Math.PI * 0.15,
		0.5,
		0.5,
	);
	spotLight.position.set(0, 20, 5);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.radius = 8;
	scene.add(spotLight);

	const mixer = new THREE.AnimationMixer(model);
	const hasAnimation = gltf.animations.length;
	const combatAnimations = gltf.animations.slice(0, 5);
	const dancingAnimations = gltf.animations.slice(5);

	const actions = document.querySelector('.actions');

	let currentAction;

	for (const combatAnimation of combatAnimations) {
		const button = document.createElement('button');

		button.innerText = combatAnimation.name;
		actions.appendChild(button);

		button.addEventListener('click', () => {
			const prevAction = currentAction;

			currentAction = mixer.clipAction(combatAnimation);

			if (prevAction !== currentAction) {
				prevAction.fadeOut(0.5);
				currentAction.reset().fadeIn(0.5).play();
			}
		});
	}

	if (!hasAnimation) return;
	currentAction = mixer.clipAction(gltf.animations[0]);
	currentAction.play();

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();

	// renderer
	const clock = new THREE.Clock();
	const render = () => {
		const deltaTime = clock.getDelta();
		controls.update();
		mixer.update(deltaTime);
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

	const pointerDown = event => {
		pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
		pointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;

		raycaster.setFromCamera(pointer, camera);

		const intersects = raycaster.intersectObjects(scene.children);

		const object = intersects[0]?.object;

		if (object?.name === 'Ch46') {
			const prevAction = currentAction;

			const index = Math.round(
				Math.random() * (dancingAnimations.length - 1),
			);
			currentAction = mixer.clipAction(dancingAnimations[index]);

			currentAction.loop = THREE.LoopOnce;
			currentAction.clampWhenFinished = true;

			if (prevAction !== currentAction) {
				prevAction.fadeOut(0.5);
				currentAction.reset().fadeIn(0.5).play();
			}

			const handleFinished = () => {
				const prevAction = currentAction;

				currentAction = mixer.clipAction(combatAnimations[0]);

				prevAction.fadeOut(0.5);
				currentAction.reset().fadeIn(0.5).play();
			};

			mixer.addEventListener('finished', handleFinished);
		}
	};

	window.addEventListener('pointerdown', pointerDown);
};

window.addEventListener('load', () => {
	init();
});
