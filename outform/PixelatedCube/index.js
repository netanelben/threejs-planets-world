import * as THREE from "three";

function PixelatedSphere() {
  const loader = new THREE.CubeTextureLoader();
  loader.setPath("PixelatedSphere/assets/");

  const textureCube = loader.load([
    "MoireFX_00002.jpg",
    "MoireFX_00002.jpg",
    "MoireFX_00003.jpg",
    "MoireFX_00004.jpg",
    "MoireFX_00005.jpg",
    "MoireFX_00006.jpg",
  ]);

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    envMap: textureCube,
    reflectivity: 1,
    // wireframe: true,
  });

  const geometry = new THREE.SphereGeometry(66, 66, 66);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(10, 10, 10);

  return mesh;
}

export default PixelatedSphere;
