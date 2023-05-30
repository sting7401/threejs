import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
camera.position.set(0, 0, 2);

const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('#conatinaer').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
	color: 0x039f34,
	wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const render = () => {
	renderer.render(scene, camera);
};

const resize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
	requestAnimationFrame(() => {
		animate();
	});

	render();
};

window.addEventListener(
	'resize',
	() => {
		resize();
	},
	false,
);
