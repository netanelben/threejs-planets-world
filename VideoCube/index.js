import * as THREE from "three";
// https://www.youtube.com/get_video_info?video_id=ID

function VideoCube() {
  const video = document.getElementById("video");
  video.play();
  //   const texture = new THREE.VideoTexture(video);
  const texture = new THREE.CubeTexture();
  texture.colorSpace = THREE.SRGBColorSpace;

  // Cube with Youtube Video
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  const material = new THREE.MeshLambertMaterial({
    color: 0x000000,
    map: texture,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(10, 5, 5);

  return {
    cube,
    texture,
  };
}

export default VideoCube;
