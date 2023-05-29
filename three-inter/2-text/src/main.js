import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import GUI from 'lil-gui';


const guiAdd = (folder, object, prop, min, max, step) => {
    return folder.add(object, prop).min(min).max(max).step(step);
}

const init =  async () => {
    const gui = new GUI();
    const renderer = new THREE.WebGLRenderer({
        // alpha: true
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;


    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        500,
    );
        // scene

    // camera
    camera.position.set(0,1,5);

    const controls = new OrbitControls(camera, renderer.domElement);



    // font
    const fontLoader = new FontLoader();

    const urlFont = `./assets/fonts/The_Jamsil_3_Regular_Regular.json`;
    const font = await fontLoader.loadAsync(urlFont);

    const textGeometry = new TextGeometry('한글로 입력 SpotLight', {
        font, 
        size: 0.5,
        height: 0.1,
    });
    const textMaterial = new THREE.MeshPhongMaterial();
    const text = new THREE.Mesh(textGeometry, textMaterial);

    text.castShadow = true;

    textGeometry.computeBoundingBox();

    // textGeometry.translate(-(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) * 0.5, -(textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y) * 0.5, -(textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z) * 0.5);
    textGeometry.center();

    // texture
    const textImg = `abstract-3092201_640.jpg`;
    const textImg2 = `fabric-3506846_640.jpg`;
    const textImg3 = `pexels-photo-7135121.jpg`;

    const textureArray = [`abstract-3092201_640.jpg`, `fabric-3506846_640.jpg`];

    const textureLoader = new THREE.TextureLoader().setPath('./assets/images/');
    const texture = await textureLoader.loadAsync(textImg);
    const texture2 = await textureLoader.loadAsync(textImg2);

    textMaterial.map = texture;
    textMaterial.map =  texture2;


    scene.add(text);

    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    const planeMaterial = new THREE.MeshPhongMaterial({color: 0x000000});

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.position.z = -10;
    plane.receiveShadow = true;
    scene.add(plane);

    // ambientLight
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // spotLight
    const spotLight = new THREE.SpotLight(0xffffff, 2.5, 30 , Math.PI *0.15, 0.2, 0.5);
    spotLight.position.set(0, 0,3);
    spotLight.target.position.set(0,0,-3);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height= 1024;
    spotLight.shadow.radius = 10;
    scene.add(spotLight,   spotLight.target);

    const spotLightTexture = new THREE.TextureLoader().setPath('./assets/images/');
    const texture3 = await textureLoader.loadAsync(textImg3);

    texture3.encoding = THREE.sRGBEncoding;

    
    spotLight.map = texture3;

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
 scene.add(spotLightHelper);



    const spotLightFolder=  gui.addFolder('SpotLight');
    spotLightFolder.add(spotLight,'angle').min(0).max(Math.PI /2).step(0.01);
    spotLightFolder.add(spotLight.position,'z').min(0).max(10).step(0.01);
    spotLightFolder.add(spotLight,'distance').min(1).max(30).step(0.01);
    spotLightFolder.add(spotLight,'decay').min(1).max(10).step(0.01);
    spotLightFolder.add(spotLight,'penumbra').min(0).max(1).step(0.01);
    spotLightFolder.add(spotLight.shadow,'radius').min(1).max(20).step(0.01);

    // effects
    const composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);

    composer.addPass(renderPass)

    const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2,1, 0);

    composer.addPass(unrealBloomPass);


    


    const unrealBloomPassFolder = gui.addFolder("unrealBloomPass");
    unrealBloomPassFolder.add(unrealBloomPass,'strength').min(0).max(1).step(0.01);
    unrealBloomPassFolder.add(unrealBloomPass,'radius').min(0).max(1).step(0.01);
    unrealBloomPassFolder.add(unrealBloomPass,'threshold').min(0).max(1).step(0.01);

    // renderer
    const render = () => {
        renderer.render(scene, camera);

        composer.render()

         spotLightHelper.update()
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


    window.addEventListener('mousemove', (event) => {
        const mouseX = ((event.clientX / window.innerWidth )- 0.5) *5;
        const mouseY = -(( event.clientY / window.innerHeight )- 0.5) *5;

        spotLight.target.position.set(mouseX, mouseY, -3);
    });
};

window.addEventListener('load', () => {
    init();
});


