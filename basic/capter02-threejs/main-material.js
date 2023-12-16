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

const directionalLight = new THREE.DirectionalLight(color(0xffffff), 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 3, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
	color: color(0xbbbbbb),
});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI / 2; // 90도 회전
floorMesh.receiveShadow = true; // 그림자 받을수 있게
floorMesh.castShadow = true; // 빛이 그림자를 만들수 있게
scene.add(floorMesh);

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshBasicMaterial({
	color: color(0x0fffff),
	side: THREE.FrontSide,
});
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.set(0, 0.5, 0);
frontSideMesh.lookAt(0, 0, 0);
frontSideMesh.castShadow = true;
frontSideMesh.receiveShadow = true;
scene.add(frontSideMesh);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshBasicMaterial({
	color: color(0x00ff00),
	side: THREE.BackSide,
});
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.set(2, 0.51, 0);
backSideMesh.lookAt(0, 0, 0);
// backSideMesh.castShadow = true;
backSideMesh.receiveShadow = true;
scene.add(backSideMesh);

const doubleSGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSMaterial = new THREE.MeshBasicMaterial({
	color: color(0x00ff00),
	side: THREE.DoubleSide,
});
const doubleSMesh = new THREE.Mesh(doubleSGeometry, doubleSMaterial);
doubleSMesh.position.set(-2, 0.5, 0);
doubleSMesh.lookAt(0, 0, 0);
// doubleSMesh.castShadow = true;
doubleSMesh.receiveShadow = true;
scene.add(doubleSMesh);

const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.5, 100, 20);
const torusKnotStandardMaterial = new THREE.MeshStandardMaterial({
	color: color(0xff0000),
});

torusKnotStandardMaterial.roughness = 0.5;
torusKnotStandardMaterial.metalness = 1;
const torusKnotStandardMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotStandardMaterial,
);
torusKnotStandardMesh.castShadow = true;
torusKnotStandardMesh.receiveShadow = true;
torusKnotStandardMesh.position.set(-4, 1, 0);
scene.add(torusKnotStandardMesh);

const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
	color: color(0xff0000),
});
torusKnotLambertMaterial.emissive = color(0x00ff00);
torusKnotLambertMaterial.emissiveIntensity = 0.2;
const torusKnotLambertMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotLambertMaterial,
);
torusKnotLambertMesh.castShadow = true;
torusKnotLambertMesh.receiveShadow = true;
torusKnotLambertMesh.position.set(-2, 1, 0);
scene.add(torusKnotLambertMesh);

const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({
	color: color(0xff0000),
});
torusKnotPhongMaterial.emissive = color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = color(0x0000ff);
torusKnotPhongMaterial.shininess = 100;
const torusKnotPhongMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotPhongMaterial,
);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
torusKnotPhongMesh.position.set(0, 1, 0);
scene.add(torusKnotPhongMesh);

const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({
	color: color(0xff0000),
});
const torusKnotBasicMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotBasicMaterial,
);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
torusKnotBasicMesh.position.set(2, 1, 0);
scene.add(torusKnotBasicMesh);

const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({
	color: color(0xffffff),
	opacity: 0.5,
});
const torusKnotDepthMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotDepthMaterial,
);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
torusKnotDepthMesh.position.set(4, 1, 0);
scene.add(torusKnotDepthMesh);

const textureLoader = new THREE.TextureLoader();
// textureLoader.load('/public/threejs.webp', (texture) => {
// 	const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
// 	const textureMaterial = new THREE.MeshBasicMaterial({ map: texture });
// 	const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
// 	textureMesh.castShadow = true;
// 	textureMesh.receiveShadow = true;
// 	textureMesh.position.set(0, 1, 4);
// 	scene.add(textureMesh);
// });

const texture = await textureLoader.loadAsync('/public/threejs.webp');
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureMaterial = new THREE.MeshBasicMaterial({ map: texture });
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
textureMesh.castShadow = true;
textureMesh.receiveShadow = true;
textureMesh.position.set(0, 1, 4);
scene.add(textureMesh);

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

	textureMesh.rotation.y += 0.01;
};

render();

// window.addEventListener('click', () => {
// 	scene.add(sphereMash);
// });
