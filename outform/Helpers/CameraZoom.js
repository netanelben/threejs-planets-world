import * as THREE from "three";
import { gsap } from "gsap";

export const zoomAt = (target, camera) => {
  //use this code for a object size agnostic solution; build a bounding box around your object you want to zoom and  get its size:
  const aabb = new THREE.Box3().setFromObject(target);
  const center = aabb.getCenter(new THREE.Vector3());
  const size = aabb.getSize(new THREE.Vector3());

  gsap.to(camera.position, {
    duration: 1,
    x: center.x,
    y: center.y + 1, // place camera a bit higher than the object
    z: center.z + size.z + 1, // maybe adding even more offset depending on your model
    onUpdate: function () {
      camera.lookAt(target.position); //important
    },
  });

  gsap.to(orbitControls.target, {
    duration: 1,
    x: center.x,
    y: center.y, //set the center of the controler to the zoomed object
    z: center.z, // no distance needed
    onComplete: () => {
      orbitControls.enabled = true; // activate the controler again after animation
    },
  });
};
