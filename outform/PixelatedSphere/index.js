import * as THREE from "three";
import { zoomAt } from "../Helpers/CameraZoom";
import { getFirstObjectWithName } from "../Helpers/RayCastHelper";

const objectName = "PixelatedSphere";

function PixelatedSphere(camera, scene) {
  let pixelatedSphere;

  function init() {
    const loader = new THREE.CubeTextureLoader();
    loader.setPath("PixelatedSphere/assets/");

    const textureCube = loader.load([
      "MoireFX_00003.jpg",
      "MoireFX_00004.jpg",
      "MoireFX_00003.jpg",
      "MoireFX_00004.jpg",
      "MoireFX_00005.jpg",
      "MoireFX_00006.jpg",
    ]);

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      envMap: textureCube,
      reflectivity: 1,
      wireframe: true,
    });

    const sphereSize = 150;
    const geometry = new THREE.SphereGeometry(
      sphereSize,
      sphereSize,
      sphereSize
    );
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    mesh.name = objectName;
    pixelatedSphere = mesh;

    scene.add(pixelatedSphere);
  }

  function clickEvent() {
    const objectFound = getFirstObjectWithName(
      event,
      window,
      camera,
      scene,
      objectName
    );
    objectFound && zoomAt(pixelatedSphere, camera);
  }

  init();
  // document.addEventListener("click", clickEvent);

  return pixelatedSphere;
}

export default PixelatedSphere;
