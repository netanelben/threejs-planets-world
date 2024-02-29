import { gsap } from "gsap";
import config from "../config";

export function cameraReset({ camera, scene, orbitControls }) {
  const [x, y, z] = config.cameraPosition;

  gsap.to(camera.position, {
    duration: 1,
    x,
    y,
    z,
    onUpdate: function () {
      camera.lookAt(scene.position);
    },
  });

  gsap.to(orbitControls.target, {
    duration: 1,
    x: 0,
    y: 0,
    z: 0,
    onComplete: () => {
      orbitControls.enabled = true;
    },
  });
}
