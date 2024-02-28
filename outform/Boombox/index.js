import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { getFirstObjectWithName } from "../Helpers/RayCastHelper";

const objectName = "Boombox";

function Boombox(camera, scene) {
  let isPlaying = false;

  function init() {
    //   Load the boombox model object
    const loader = new GLTFLoader();

    loader.setPath("../3dModels/retro-boombox/");
    loader.load("retro-boombox.glb", function (object) {
      object.position.y = 25;
      object.name = objectName;
      scene.add(object);
    });
  }

  function initAudio() {
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load("sounds/afx.mp3", function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.3);
    });
  }

  function initLights() {
    // Lights
    const keyLight = new THREE.DirectionalLight(
      new THREE.Color("hsl(30, 100%, 75%)"),
      1.0
    );
    keyLight.position.set(-100, 0, 100);
    const fillLight = new THREE.DirectionalLight(
      new THREE.Color("hsl(240, 100%, 75%)"),
      0.75
    );
    fillLight.position.set(100, 0, 100);
    const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize(); // normalizing the vector;

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
  }

  function togglePlay() {
    if (isPlaying) {
      sound.stop();
      isPlaying = false;
    } else {
      sound.play();
      isPlaying = true;
    }
  }

  //   On click event to play music using rayCasting helper function
  function clickEvent(event) {
    const objectFound = getFirstObjectWithName(
      event,
      window,
      camera,
      scene,
      objectName
    );
    objectFound && togglePlay();
  }

  init();
  // initAudio();
  // initLights();

  // document.addEventListener("click", clickEvent);
}

export default Boombox;
