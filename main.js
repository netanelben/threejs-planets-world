import * as THREE from "three";
import { gsap } from "gsap";
import { GUI } from "dat.gui";
import { zoomAt, cameraReset, splitString } from "./Helpers";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import config from "./config";

// Dat Gui
window.gui = new GUI({ closed: false });

// Essentials
import Renderer from "./Renderer";
import Camera from "./Camera";
import Controls from "./Controls";
import Lighting from "./Lighting";

// Elements
import RandomSpheres from "./RandomSpheres";
import PixelatedSphere from "./PixelatedSphere";
import BoomboxModel from "./BoomboxModel";
import AudioVisualizer from "./AudioVisualizer";

let isInSphere = false;

const renderer = Renderer();
const scene = new THREE.Scene();
const camera = Camera();
const loadingManager = new THREE.LoadingManager();

// Background
scene.background = new THREE.Color("black");

// Texture Background
// const bgTextureURLS = Array.from({ length: 6 }).map(
//   (a, index) => `images/bg/${index + 1}.jpg`
// );
// scene.background = new THREE.CubeTextureLoader().load(bgTextureURLS);

// Lights
Lighting(scene);

// Helpers
config.showGridHelper && scene.add(new THREE.GridHelper(300, 100));
const axesHelper = new THREE.AxesHelper(1000);
axesHelper.visible = config.showAxesHelper;
gui.addFolder("AxesHelper").add(axesHelper, "visible");
scene.add(axesHelper);

// Orbit Controls
const orbitControls = Controls(camera, renderer);

// First Planet
// Pixelated Sphere
const { mesh: audioMesh, sound } = AudioVisualizer(scene, camera, renderer);
const pixelatedSphere = PixelatedSphere({
  camera,
  scene,
  orbitControls,
  renderer,
  audioMesh,
  sound,
});

// Second Planet
// Video Cube
const video = document.querySelector("#video");
const videoTexture = new THREE.VideoTexture(video);
const videoBox = new THREE.Mesh(
  new THREE.BoxGeometry(100, 100, 100),
  new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.FrontSide,
    toneMapped: false,
  })
);

const loader = new THREE.CubeTextureLoader();
loader.setPath("../images/");
const textureDeepSea = loader.load([
  "ocean_deep.jpg",
  "ocean_deep.jpg",
  "ocean_deep.jpg",
  "ocean_deep.jpg",
  "ocean_deep.jpg",
  "ocean_deep.jpg",
]);

const videoSphere = new THREE.Mesh(
  new THREE.SphereGeometry(150, 150, 150),
  new THREE.MeshBasicMaterial({
    envMap: textureDeepSea,
  })
);
videoSphere.position.set(-300, -300, 0);
videoSphere.add(videoBox);
scene.add(videoSphere);

// Third Planet
// Fetch Astronomy Of Today
let astroSphere;
fetch(
  "//api.nasa.gov/planetary/apod/?api_key=wDoVLTgSmPH6GgKdH1eqTSfgKM4APs9UWMRZNedo"
)
  .then((res) => res.json())
  .then((json) => {
    console.log(json);

    // Didnt work due to CORS
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "anonymous";
    const textureImage = textureLoader.load(json.url);

    astroSphere = new THREE.Mesh(
      new THREE.SphereGeometry(120, 120, 120),
      new THREE.MeshBasicMaterial({
        envMap: textureImage,
      })
    );
    astroSphere.position.set(226, 38, 83);

    const maxLength = 60;
    const splitExplanation = splitString(json.explanation, maxLength);

    // Text
    new FontLoader().load("fonts/optimer.typeface.json", function (font) {
      const text = `
        NASA - Astronomy Picture of the Day
        ${json.title} from ${json.date}
        ${splitExplanation[0]}
        ${splitExplanation[1]}
        ${splitExplanation[2]}
        ${splitExplanation[3]}
      `;
      const geometry = new TextGeometry(text, {
        font: font,
        size: 5,
        height: 2,
        curveSegments: 0.1,
      });

      const textMesh = new THREE.Mesh(geometry);
      textMesh.position.set(-50, 33, 0);
      astroSphere.add(textMesh);
    });

    scene.add(astroSphere);
  });

// Zoom Click Handlers
document.querySelector("#btn-reset-camera").addEventListener("click", () => {
  isInSphere = false;
  cameraReset({ camera, scene, orbitControls });
  sound.stop();
  video.pause();
});
document.querySelector("#btn-first-sphere").addEventListener("click", () => {
  isInSphere = true;
  zoomAt({ target: pixelatedSphere, camera, orbitControls });
  video.pause();
});
document.querySelector("#btn-second-exp").addEventListener("click", () => {
  isInSphere = true;
  zoomAt({ target: videoSphere, camera, orbitControls, offsetZ: 20 });
  sound.stop();
  setTimeout(function () {
    video.play();
  }, 4000);
});
document.querySelector("#btn-third-exp").addEventListener("click", () => {
  isInSphere = true;
  zoomAt({ target: astroSphere, camera, orbitControls, offsetZ: 20 });
  sound.stop();
  video.stop();
});

// Random Cones Decorations
RandomSpheres(scene);

// Text
new FontLoader().load("fonts/optimer.typeface.json", function (font) {
  const geometry = new TextGeometry("Welcome to planetactive", {
    font: font,
    size: 65,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 3,
    bevelOffset: 0,
    bevelSegments: 3,
  });

  const materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
  ];
  const textMesh = new THREE.Mesh(geometry, materials);
  textMesh.position.set(-600, 200, 0);
  scene.add(textMesh);
});

// Boombox 3D Model from Blender.
const boomboxModel = BoomboxModel({ scene, loadingManager });

// Loading Progress Bar
const progressBarElm = document.querySelector("#progress-bar");
const loadingStartButton = document.querySelector(".start-button");
loadingStartButton.addEventListener("click", () => {
  gsap.to(document.querySelector(".progress-bar-wrapper"), {
    duration: 1,
    opacity: 0,
    zIndex: -100,
  });
});

loadingManager.onProgress = (url, loaded, total) => {
  progressBarElm.value = (loaded / total) * 100;
};
loadingManager.onLoad = () => {
  loadingStartButton.style.opacity = 1;
  document
    .querySelector("#progress-bar-label")
    .classList.remove("animate-charcter-animation");
};

// Change scene dimension upon browser resize
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  window.bloomComposer &&
    window.bloomComposer.setSize(window.innerWidth, window.innerHeight);
};

// Animations
const clock = new THREE.Clock();
var target = { x: 0, y: 0, z: 0 };
var camera_offset = { x: 450, y: 450, z: 450 };
var camera_speed = 0.05;

function animateCameraAroundSphere(time) {
  scene.position.x = 5 + 2 * Math.cos(time * 2);
  scene.position.y = 2 + 5 * Math.abs(Math.sin(time * 2));

  target.x = scene.position.x;
  target.z = scene.position.z;

  camera.position.x =
    target.x + camera_offset.x * Math.sin(time * camera_speed);
  camera.position.y = target.y + camera_offset.y;
  camera.position.z =
    target.z + camera_offset.z * Math.cos(time * camera_speed);

  camera.lookAt(target.x, target.y, target.z);
}

const mouse = new THREE.Vector2(),
  raycaster = new THREE.Raycaster();

function onPointerMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener("pointermove", onPointerMove);
function animate() {
  requestAnimationFrame(animate);
  orbitControls.update();

  // Audio Visualizer
  if (window.uniforms && window.bloomComposer && window.analyser) {
    window.uniforms.u_time.value = clock.getElapsedTime();
    window.uniforms.u_frequency.value = window.analyser.getAverageFrequency();
    window.bloomComposer.render();
  }

  // Rotate around sphere
  clock.getDelta();
  let time = clock.elapsedTime.toFixed(2);

  if (!isInSphere) {
    animateCameraAroundSphere(time);
  }

  raycaster.setFromCamera(mouse, camera);
  const intersections = raycaster.intersectObjects(scene.children);
  // console.log("Boombox", intersections[0].object.name === "Boombox");

  // console.log(boomboxModel);

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
