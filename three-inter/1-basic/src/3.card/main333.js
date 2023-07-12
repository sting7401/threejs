import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import Card from './Card';

import { gsap } from 'gsap';

// Three.js 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ammo.js 초기화
Ammo().then(function (AmmoLib) {
	Ammo = AmmoLib;
	init();
	animate();
});

// 초기화 함수
function init() {
	// 물리 월드 생성
	const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
	const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
	const overlappingPairCache = new Ammo.btDbvtBroadphase();
	const solver = new Ammo.btSequentialImpulseConstraintSolver();
	const physicsWorld = new Ammo.btDiscreteDynamicsWorld(
		dispatcher,
		overlappingPairCache,
		solver,
		collisionConfiguration,
	);
	physicsWorld.setGravity(new Ammo.btVector3(0, -9.8, 0)); // 중력 설정

	// 배 생성
	const boatGroup = new THREE.Group();

	// 배의 몸체
	const hullGeometry = new THREE.BoxGeometry(2, 0.5, 6);
	const hullMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
	const hull = new THREE.Mesh(hullGeometry, hullMaterial);
	boatGroup.add(hull);

	// 배의 돛
	const sailGeometry = new THREE.PlaneGeometry(4, 4);
	const sailMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
	const sail = new THREE.Mesh(sailGeometry, sailMaterial);
	sail.position.z = -3;
	boatGroup.add(sail);

	scene.add(boatGroup);

	// 바다 생성
	const seaGeometry = new THREE.PlaneGeometry(100, 100);
	const seaMaterial = new THREE.MeshPhongMaterial({
		color: 0x00bfff,
		side: THREE.DoubleSide,
		flatShading: THREE.FlatShading,
	});
	const sea = new THREE.Mesh(seaGeometry, seaMaterial);
	sea.rotation.x = -Math.PI / 2;
	scene.add(sea);

	// Ammo.js 물리 객체 생성
	const boatShape = new Ammo.btBoxShape(new Ammo.btVector3(1, 0.25, 3));
	const boatTransform = new Ammo.btTransform();
	boatTransform.setIdentity();
	boatTransform.setOrigin(new Ammo.btVector3(0, 1, 0));
	const boatMotionState = new Ammo.btDefaultMotionState(boatTransform);
	const boatMass = 80;
	const boatLocalInertia = new Ammo.btVector3(0, 0, 0);
	boatShape.calculateLocalInertia(boatMass, boatLocalInertia);
	const boatRigidBodyInfo = new Ammo.btRigidBodyConstructionInfo(
		boatMass,
		boatMotionState,
		boatShape,
		boatLocalInertia,
	);
	const boatRigidBody = new Ammo.btRigidBody(boatRigidBodyInfo);
	physicsWorld.addRigidBody(boatRigidBody);

	// 조명 추가
	const ambientLight = new THREE.AmbientLight(0x404040);
	scene.add(ambientLight);
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(-1, 1, 1);
	scene.add(directionalLight);

	camera.position.z = 15;

	// 애니메이션 루프
	function animate() {
		requestAnimationFrame(animate);

		// Ammo.js 물리 시뮬레이션 업데이트
		physicsWorld.stepSimulation(1 / 60, 10);

		// Ammo.js 물리 객체의 위치와 회전을 Three.js 객체에 반영
		const boatTransform = new Ammo.btTransform();
		boatRigidBody.getMotionState().getWorldTransform(boatTransform);
		const boatPosition = boatTransform.getOrigin();
		const boatQuaternion = boatTransform.getRotation();
		boatGroup.position.set(
			boatPosition.x(),
			boatPosition.y(),
			boatPosition.z(),
		);
		boatGroup.quaternion.set(
			boatQuaternion.x(),
			boatQuaternion.y(),
			boatQuaternion.z(),
			boatQuaternion.w(),
		);

		renderer.render(scene, camera);
	}
}
