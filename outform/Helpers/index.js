import { GUI } from "dat.gui";

export default function DatGui(camera) {
  const gui = new GUI({ closed: false });
  const cameraFolder = gui.addFolder("Camera");
  cameraFolder.closed = false;
  cameraFolder.add(camera.position, "x", 0, 500);
  cameraFolder.add(camera.position, "y", 0, 500);
  cameraFolder.add(camera.position, "z", 0, 500);
}
// cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
// cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
// cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
// cubeFolder.open();
// const cameraFolder = gui.addFolder("Camera");
// cameraFolder.add(camera.position, "z", 0, 10);
// cameraFolder.open();
