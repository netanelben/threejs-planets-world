import * as THREE from "three";
import DatGui from "./Helpers";

// Essentials
import Renderer from "./Renderer";
import Camera from "./Camera";
import Controls from "./Controls";
import Lighting from "./Lighting";
import Boombox from "./Boombox";

// Elements
import RandomCones from "./RandomCones";
import VideoCube from "./VideoCube";
import PixelatedSphere from "./PixelatedSphere";

import "./style.css";

const renderer = Renderer();
const scene = new THREE.Scene();

// Background & Fog effect
scene.fog = new THREE.FogExp2("#E9F6FF", 0.0015);
const backgroundLoader = new THREE.TextureLoader();
// scene.background = backgroundLoader.load("images/bg_stars.webp");
// scene.background = backgroundLoader.load("images/andro.jpg");
// scene.background.colorSpace = THREE.Color; // even when deprecated, renders better image
scene.background = new THREE.Color("#280274");

const camera = Camera();

// Lights
const { spotLight, spotLightHelper } = Lighting();
scene.add(spotLight);
// scene.add(spotLightHelper);

// Helpers
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

// Orbit Controls
const controls = Controls(camera, renderer);

// Objects
Boombox(camera, scene, render);

// Pixelated Sphere
PixelatedSphere(camera, scene);

// Random Cones Decorations
RandomCones(scene);

// Change scene dimension upon browser resize
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // cube.rotation.y += 0.01;
  // pixelatedSphere.rotation.z += 1;

  render();
}

function render() {
  renderer.render(scene, camera);
}

// animate();
render();

DatGui(camera);

// const raycaster = new THREE.Raycaster();
// const pointer = new THREE.Vector2();

// function onPointerMove(event) {
//   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }
// raycaster.setFromCamera(pointer, camera);

// const intersects = raycaster.intersectObjects(scene.children);

// for (let i = 0; i < intersects.length; i++) {
//   console.log(intersects);
//   intersects[i].object.material.color.set("red");
//   // intersects[i].object.visible = false;
// }

// window.addEventListener("pointermove", onPointerMove);
