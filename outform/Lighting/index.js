import * as THREE from "three";

export default function Lighting() {
  const spotLight = new THREE.SpotLight(0x0000ff);
  spotLight.position.set(0, 0, 0);
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);

  return {
    spotLightHelper,
    spotLight,
  };
}
