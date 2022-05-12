import * as THREE from "three";
import { OrbitControls } from "controls";
import { GLTFLoader } from "gltfloader";
import { FBXLoader } from "fbxloader";
import Stats from "stats";

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// STATS
let container, stats;

container = document.createElement("div");
document.body.appendChild(container);
stats = new Stats();
container.appendChild(stats.dom, renderer.domElement);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// LOADER
const gltfloader = new GLTFLoader();
const fbxloader = new FBXLoader();
const skyboxloader = new THREE.CubeTextureLoader();

// RESIZE HAMDLER
export function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

// INIT CAMERA
camera.position.z = 25;
camera.position.x = 3;
camera.position.y = 6;
camera.lookAt(0, 0, -20);

// INIT HEMISPHERE LIGHT
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// SCENE
const skybox = skyboxloader.load([
    "src/skybox/bay_ft.jpg",
    "src/skybox/bay_bk.jpg",
    "src/skybox/bay_up.jpg",
    "src/skybox/bay_dn.jpg",
    "src/skybox/bay_rt.jpg",
    "src/skybox/bay_lf.jpg",
]);

scene.background = skybox;

// FLOOR
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500, 32),
    new THREE.MeshPhongMaterial({ color: 0xfab74b })
);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// PLAYER
// let player;
// gltfloader.load("src/player/player.gltf", function (object) {
//     player = object;
//     player.position.set(3, 0, 5);
//     player.receiveShadow = true;
//     player.castShadow = true;
//     player.scale.set(5, 5, 5);
//     player.traverse((c) => {
//         c.castShadow = true;
//     });
//     scene.add(player);
// });

let player;
fbxloader.load("src/player/player.fbx", (object) => {
    player = object;
    player.scale.setScalar(0.05);
    player.traverse((c) => {
        c.castShadow = true;
    });
    scene.add(player);
});

// CONE
const cone = new THREE.Mesh(
    new THREE.ConeGeometry(2, 5, 64),
    new THREE.MeshPhongMaterial({ color: 0xdbde40 })
);
cone.position.set(7, 2.5, 2.7);
cone.receiveShadow = true;
cone.castShadow = true;
scene.add(cone);

// CYLINDER
const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 6, 64),
    new THREE.MeshPhongMaterial({ color: 0x3ea34c })
);
cylinder.position.set(3, 3, 2.7);
cylinder.receiveShadow = true;
cylinder.castShadow = true;
scene.add(cylinder);

// TORUS
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(2, 0.5, 64, 64),
    new THREE.MeshPhongMaterial({ color: 0x2a7ab0 })
);
torus.position.set(-0.5, 2.5, 2.7);
torus.rotateY(2.5);
torus.receiveShadow = true;
torus.castShadow = true;
scene.add(torus);

// DIRECTIONAL LIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.x += 20;
directionalLight.position.y += 20;
directionalLight.position.z += 20;
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
const d = 25;
directionalLight.shadow.camera.left = -d;
directionalLight.shadow.camera.right = d;
directionalLight.shadow.camera.top = d;
directionalLight.shadow.camera.bottom = -d;
scene.add(directionalLight);

scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

// SPOT LIGHT
// const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( 20, 15, 20 );
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 4096;
// spotLight.shadow.mapSize.height = 4096;
// scene.add(spotLight)

// POINT LIGHT
// const light1 = new THREE.PointLight( 0xff0000, 1, 100 );
// light1.position.set( 20, 20, 20 );
// light1.castShadow = true;
// light1.shadow.mapSize.width = 4096;
// light1.shadow.mapSize.height = 4096;
// scene.add( light1 );

// const light2 = new THREE.PointLight( 0x00ff00, 1, 100 );
// light2.position.set( 20, 20, 20 );
// light2.castShadow = true;
// light2.shadow.mapSize.width = 4096;
// light2.shadow.mapSize.height = 4096;
// scene.add( light2 );

// ANIMATE
function animate() {
    // TARGET
    // const time = Date.now() * 0.0005;
    // directionalLight.position.x = Math.sin(time * 0.7) * 20;
    // directionalLight.position.z = Math.cos(time * 0.7) * 20;

    // spotLight.position.x = Math.sin(time * 0.7) * 20;
    // spotLight.position.z = Math.cos(time * 0.7) * 20;

    // light1.position.x = Math.sin(time) * 20;
    // light1.position.z = Math.sin(time) * 20;
    // light2.position.x = Math.cos(time) * -20;
    // light2.position.z = Math.cos(time) * 20;

    // if (player) {
    //     player.rotation.x += 0.1;
    //     player.rotation.y += 0.1;
    //     player.rotation.z += 0.1;
    // }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    stats.update();
}
document.body.appendChild(renderer.domElement);
animate();
