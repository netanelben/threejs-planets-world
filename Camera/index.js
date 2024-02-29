import * as THREE from "three";
import config from "../config";

const [x, y, z] = config.cameraPosition;
const { innerWidth, innerHeight } = window;

export default function Camera() {
  const camera = new THREE.PerspectiveCamera(
    60,
    innerWidth / innerHeight,
    1, // near
    1000 // far
  );

  camera.position.set(x, y, z);

  return camera;
}
