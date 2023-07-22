import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import GUI from 'lil-gui';

const init = () => {
    const options = {
        color: 0x00ffff,
    }

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

    const cubeGeometry = new THREE.IcosahedronGeometry(1);
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0xcc99ff),
        // transparent: false,
        // opacity: 1,
        // visible: true,
        // wireframe: false,
        // side: THREE.DoubleSide,

        emissive: new THREE.Color(0x111111),
    });
    const skeletonGeometry = new THREE.IcosahedronGeometry(2);
    const skeletonMaterial = new THREE.MeshBasicMaterial({
        wireframe: true,
        transparent: true,
        opacity:0.2,
        color: new THREE.Color(0xaaaaaa)
    });

    cubeMaterial.color = new THREE.Color(0xffffff);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

    // scene
    scene.add(cube,skeleton)

    // camera
    camera.position.x = 5;
    camera.lookAt(cube.position);

    // light
    scene.add(directionalLight);

    // renderer

    const clock = new THREE.Clock();

    const controls = new OrbitControls(camera, renderer.domElement);


    const axesHelper = new THREE.AxesHelper(5);

    scene.add( axesHelper);

    controls.autoRotate = true;
    controls.autoRotateSpeed = 10;
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.maxDistance = 50;
    controls.minDistance = 10;
    // controls.maxAzimuthAngle = Math.PI/2;
    // controls.minAzimuthAngle = Math.PI/3;


    const render = () => {

        // cube.rotation.x = THREE.MathUtils.degToRad(45);
        // cube.rotation.x = Date.now() / 1000;

        // cube.rotation.y =+ Math.sin(cube.rotation.x);
        // cube.scale.x = Math.cos(cube.rotation.x);

        const elapsedTime = clock.getElapsedTime();
        const deltaTime = clock.getDelta()
        // cube.rotation.x = elapsedTime;
        // cube.rotation.y = elapsedTime;
        // skeleton.rotation.x = elapsedTime * 1.5;
        // skeleton.rotation.y = elapsedTime * 1.5;

        renderer.render(scene, camera);
        controls.update();
        requestAnimationFrame(render);
    }

    render();

    const handleResize= () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
        controls.update();
    }

    window.addEventListener('resize', handleResize);

    const gui = new GUI();
    // gui.add(cube.position, 'y', -3, 3, 0.1);
    

    gui
        .add(cube.position, 'y')
        .min(-3)
        .max(3)
        .step(0.1);
    gui.add(cube.position,'x').min(0).max(0).step(0.1);

    gui.add(cube, 'visible');

    gui.addColor(options, 'color').onChange((value)=> {
        cube.material.color.set(value);
    });
};

window.addEventListener('load', () => {
    init();
});

export default init