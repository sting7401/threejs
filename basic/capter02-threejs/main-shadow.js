import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const color = (props) => {
	return new THREE.Color(props);
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // 그림자 효과
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('#app').appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	100,
	window.innerWidth / window.innerHeight,
	0.1,
	100,
);

camera.position.set(1, 5, 5);

const directionalLight = new THREE.DirectionalLight(color(0xffffff), 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 3, 5);
directionalLight.lookAt(0, 0, 0);

directionalLight.shadow.mapSize.width = 4000;
directionalLight.shadow.mapSize.height = 4000;

directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
	directionalLight,
);
scene.add(directionalLightHelper);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
	color: color(0xbbbbbb),
	side: THREE.FrontSide,
});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI / 2; // 90도 회전
floorMesh.receiveShadow = true; // 그림자 받을수 있게
floorMesh.castShadow = true; // 빛이 그림자를 만들수 있게
scene.add(floorMesh);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
	color: color(0xffff00),
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(0, 0.5, 0);
boxMesh.castShadow = true; //
boxMesh.receiveShadow = true;
scene.add(boxMesh);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
});

const render = () => {
	renderer.render(scene, camera);
	requestAnimationFrame(render);
};

render();

// window.addEventListener('click', () => {
// 	scene.add(sphereMash);
// });
