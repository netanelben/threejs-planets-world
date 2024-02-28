import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function Controls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 20;
  controls.maxDistance = 800;
  controls.maxPolarAngle = Math.PI / 2;
  controls.screenSpacePanning = false;

  // set controls to zoom inside Sphere 1
  // controls

  return controls;
}
