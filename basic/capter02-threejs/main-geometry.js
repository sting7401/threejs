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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: color(0xff0000) });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0.5, 0);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({
	color: color(0xffff00),
});
const capsuleMash = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMash.position.set(3, 1.75, 0);
capsuleMash.castShadow = true;
capsuleMash.receiveShadow = true;
scene.add(capsuleMash);

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
const cylinderMaterial = new THREE.MeshStandardMaterial({
	color: color(0x00ff00),
});
const cylinderMash = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMash.position.set(-3, 1, 0);
cylinderMash.castShadow = true;
cylinderMash.receiveShadow = true;
scene.add(cylinderMash);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
	color: color(0x0000ff),
});
const torusMash = new THREE.Mesh(torusGeometry, torusMaterial);
torusMash.position.set(0, 0.5, 1);
torusMash.castShadow = true;
torusMash.receiveShadow = true;
scene.add(torusMash);

const starShape = new THREE.Shape();
starShape.moveTo(0, 1);
starShape.lineTo(0.2, 0.3);
starShape.lineTo(1, 0.3);
starShape.lineTo(0.4, 0);
starShape.lineTo(0.6, -0.7);
starShape.lineTo(0, -0.4);
starShape.lineTo(-0.6, -0.7);
starShape.lineTo(-0.4, 0);
starShape.lineTo(-1, 0.3);
starShape.lineTo(-0.2, 0.3);

const shapeGeometry = new THREE.ShapeGeometry(starShape);
const shapeMaterial = new THREE.MeshStandardMaterial({
	color: color(0xff00ff),
});
const shapeMash = new THREE.Mesh(shapeGeometry, shapeMaterial);
shapeMash.position.set(0, 1, 2);
scene.add(shapeMash);

const extrudeSetting = {
	step: 1,
	depth: 0.1,
	bevelEnabled: true,
	bevelThickness: 0.1,
	bevelSize: 0.3,
	bevelSegments: 100,
};

const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSetting);
const extrudeMaterial = new THREE.MeshStandardMaterial({
	color: color(0x0ffaff),
});
const extrudeMash = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMash.position.set(2, 1.3, 2);
scene.add(extrudeMash);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
	color: color(0x98daaf),
});
const sphereMash = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMash.position.set(0, 1, -3);
sphereMash.castShadow = true;
sphereMash.receiveShadow = true;
scene.add(sphereMash);

const numPoints = 1000;
const positions = new Float32Array(numPoints * 3);

Array(numPoints)
	.fill()
	.map((item, index) => {
		const x = (Math.random() - 0.5) * 1;
		const y = (Math.random() - 0.5) * 1;
		const z = (Math.random() - 0.5) * 1;

		positions[index * 3] = x;
		positions[index * 3 + 1] = y;
		positions[index * 3 + 2] = z;

		return;
	});

const bufferGeometry = new THREE.BufferGeometry(positions, 3); // cpu를 효율적으로 지오메트리
bufferGeometry.setAttribute(
	'position',
	new THREE.BufferAttribute(positions, 3),
);

const pointsMaterial = new THREE.PointsMaterial({
	color: color(0xffff00),
	size: 0.05,
});

const pointsMash = new THREE.Points(sphereGeometry, pointsMaterial);
pointsMash.position.set(0, 0.5, 3);
scene.add(pointsMash);

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
