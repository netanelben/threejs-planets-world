import * as THREE from "three";

const { innerWidth, innerHeight } = window;

export default function Camera() {
  const camera = new THREE.PerspectiveCamera(
    60,
    innerWidth / innerHeight,
    1, // near
    1000 // far
  );

  camera.position.set(150, 400, 500);

  return camera;
}
