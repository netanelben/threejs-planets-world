import * as THREE from "three";
import config from "../config";

export default function Lighting(scene) {
  const keyLight = new THREE.DirectionalLight(
    new THREE.Color("hsl(30, 100%, 75%)"),
    1.0
  );
  const fillLight = new THREE.DirectionalLight(
    new THREE.Color("hsl(240, 100%, 75%)"),
    0.75
  );
  const backLight = new THREE.DirectionalLight(0xffffff, 1.0);

  keyLight.position.set(-100, 0, 100);
  fillLight.position.set(100, 0, 100);
  backLight.position.set(100, 0, -100).normalize(); // normalizing the vector;

  const keyLightHelper = new THREE.DirectionalLightHelper(keyLight);
  const fillLightHelper = new THREE.DirectionalLightHelper(fillLight);
  const backLightHelper = new THREE.DirectionalLightHelper(backLight);

  if (config.showLightHelpers) {
    scene.add(keyLightHelper);
    scene.add(fillLightHelper);
    scene.add(backLightHelper);
  }

  // Equal light to all objects
  scene.add(new THREE.AmbientLight("red"));

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);
}
