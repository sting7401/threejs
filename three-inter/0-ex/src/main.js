import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.addEventListener('load', () => {
    init();
});

const init = () => {
    const renderer = new THREE.WebGLRenderer({
        // alpha: true
        antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        1, 
        500);

    // scene

    // camera
    camera.position.x = 5;

    const waveGeometry = new THREE.PlaneGeometry(5,5,5,5);
    const waveMaterial = new THREE.MeshStandardMaterial();
        const wave = new THREE.Mesh(waveGeometry, waveMaterial);

        wave.rotation.x = Math.PI / 3;
        
        scene.add(wave);

    // renderer
    const render = () => {

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    render();

    const handleResize= () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', handleResize);

};
