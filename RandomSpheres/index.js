import * as THREE from "three";

export default function RandomSpheres(scene) {
  const geometry = new THREE.SphereGeometry(5);

  const materialParams = {
    reflectivity: 0.3,
    metalness: 0,
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
    transmission: 0.5,
    thickness: 3,
    ior: 1.74,
  };

  function getRandomColorMaterial(index) {
    const color = new THREE.Color();
    color.setHSL(index * Math.random(), 0.8, 0.3);

    return new THREE.MeshPhysicalMaterial({
      ...materialParams,
      color,
    });
  }

  for (let i = 0; i < 500; i++) {
    const mesh = new THREE.Mesh(geometry, getRandomColorMaterial(i));

    mesh.position.x = Math.random() * 1600 - 800;
    mesh.position.y = Math.random() * 1600 - 800;
    mesh.position.z = Math.random() * 1600 - 800;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;

    scene.add(mesh);
  }
}
