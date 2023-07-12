import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

export default () => {
	const renderer = new THREE.WebGLRenderer({ alpha: true });

	const container = document.querySelector('#container');

	container.appendChild(renderer.domElement);
};
