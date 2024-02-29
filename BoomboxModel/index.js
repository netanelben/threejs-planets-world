import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function BoomboxModel({ scene, loadingManager }) {
  let boombox;

  // Load a 3D Model, GLB file.
  const gltfLoader = new GLTFLoader(loadingManager);

  gltfLoader.load("models/retro-boombox/retro-boombox.glb", function (gltf) {
    boombox = gltf.scene;

    boombox.position.set(226, 199, 56);
    boombox.scale.set(10, 10, 10);
    boombox.castShadow = true;
    boombox.receiveShadow = true;
    boombox.name = "Boombox";

    scene.add(boombox);

    // gui.addFolder("Boom x").add(boombox.position, "x", -250, 250);
    // gui.addFolder("Boom z").add(boombox.position, "z", -250, 250);
    // gui.addFolder("Boom y").add(boombox.position, "y", -250, 250);
  });
}
