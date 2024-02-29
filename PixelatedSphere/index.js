import * as THREE from "three";
import { getFirstObjectWithName } from "../Helpers/RayCastHelper";

const sphereSize = 100;
const objectName = "PixelatedSphere";

function PixelatedSphere({ camera, scene, audioMesh, sound }) {
  let pixelatedSphere;

  function init() {
    // Music play button object
    const musicPlayButton = new THREE.Mesh(
      new THREE.BoxGeometry(6, 4),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("images/play.png"),
      })
    );
    musicPlayButton.position.set(0, 17, 0);

    musicPlayButton.name = "PlayButton";

    // Aphex Twin Sphere Texture
    const loader = new THREE.CubeTextureLoader();
    loader.setPath("../images/");

    const textureCube = loader.load([
      "aphex_twin.jpg",
      "aphex_twin.jpg",
      "aphex_twin.jpg",
      "aphex_twin.jpg",
      "aphex_twin.jpg",
      "aphex_twin.jpg",
    ]);

    const material = new THREE.MeshBasicMaterial({
      envMap: textureCube,
      // wireframe: true,
    });

    const geometry = new THREE.SphereGeometry(
      sphereSize,
      sphereSize,
      sphereSize
    );
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    mesh.name = objectName;
    pixelatedSphere = mesh;

    pixelatedSphere.add(audioMesh).add(musicPlayButton);
    scene.add(pixelatedSphere);
  }

  // Mouse Events Handlers
  function handlePlayMusic(event) {
    const objectFound = getFirstObjectWithName(
      event,
      window,
      camera,
      scene,
      "PlayButton"
    );

    if (!objectFound) return;
    sound.isPlaying ? sound.stop() : sound.play();
  }

  init();

  document.addEventListener("click", handlePlayMusic);

  return pixelatedSphere;
}

export default PixelatedSphere;
