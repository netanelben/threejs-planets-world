import * as THREE from "three";
import { gsap } from "gsap";
import AudioPlayer from "../AudioPlayer";

const DURATION = 3;
const ZOOM_IN_DISTANCE = 140;

export const zoomAt = ({ target, camera, orbitControls, offsetZ = 0 }) => {
  // Play audio effect on zoom
  AudioPlayer({ soundPath: "sounds/bleep.wav", camera });

  // object size agnostic solution:
  // build a bounding box around your object you want to zoom and get its size:
  const aabb = new THREE.Box3().setFromObject(target);
  const center = aabb.getCenter(new THREE.Vector3());
  const size = aabb.getSize(new THREE.Vector3());

  gsap.to(camera.position, {
    duration: DURATION,
    x: center.x,
    y: center.y + 1, // place camera a bit higher than the object
    z: center.z + size.z - ZOOM_IN_DISTANCE - offsetZ, // zoom into the content inside the sphere
    onUpdate: function () {
      camera.lookAt(target.position);
    },
  });

  gsap.to(orbitControls.target, {
    duration: DURATION,
    x: center.x,
    y: center.y, //set the center of the controler to the zoomed object
    z: center.z, // no distance needed
    onComplete: () => {
      orbitControls.enabled = true; // activate the controler again after animation
    },
  });
};
