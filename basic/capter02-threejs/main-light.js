import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const color = (props) => {
	return new THREE.Color(props);
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // 그림자 효과
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

// const directionalLight = new THREE.DirectionalLight(color(0xffffff), 5);
// directionalLight.castShadow = true;
// directionalLight.position.set(3, 3, 5);
// directionalLight.lookAt(0, 0, 0);
// scene.add(directionalLight);

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
	color: color(0xffffff),
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(0, 0.5, 0);
boxMesh.castShadow = true; //
boxMesh.receiveShadow = true;
scene.add(boxMesh);

// const ambientLight = new THREE.AmbientLight(color(0xffffff), 5);
// ambientLight.castShadow = true;
// ambientLight.position.set(3, 3, 5);
// ambientLight.lookAt(0, 0, 0);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(color(0xffffff), 5);
// directionalLight.castShadow = true;
// directionalLight.position.set(3, 3, 5);
// directionalLight.lookAt(0, 0, 0);
// scene.add(directionalLight);

// const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(lightHelper);

// const hemisphereLight = new THREE.HemisphereLight(
// 	color(0xff00ff),
// 	color(0xff0000),
// 	5,
// );
// hemisphereLight.castShadow = true;
// hemisphereLight.position.set(0, 1, 0);
// hemisphereLight.lookAt(0, 0, 0);
// scene.add(hemisphereLight);

// const lightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1);
// scene.add(lightHelper);

// const pointLight = new THREE.PointLight(0xffffff, 5, 15, 40);
// pointLight.castShadow = true;
// pointLight.position.set(1, 1, 1);
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);

// const rectAreaLight = new THREE.RectAreaLight(0xfffff, 5, 2, 2);
// rectAreaLight.position.set(1, 1, 1);
// scene.add(rectAreaLight);

const targetObject = new THREE.Object3D();
scene.add(targetObject);

const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1);
spotLight.castShadow = true;
spotLight.position.set(0, 3, 0);
spotLight.target = targetObject;
spotLight.target.position.set(1, 0, 2);
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

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
