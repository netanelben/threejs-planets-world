import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

const params = {
  red: 1.0,
  green: 1.0,
  blue: 1.0,
  threshold: 0.5,
  strength: 0.5,
  radius: 0.8,
};

// Audio visualization based on shaders defined in index.html
export default function AudioVisualizer(scene, camera, renderer) {
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight)
  );

  bloomPass.threshold = params.threshold;
  bloomPass.strength = params.strength;
  bloomPass.radius = params.radius;

  const bloomComposer = new EffectComposer(renderer);
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(bloomPass);

  const outputPass = new OutputPass();
  bloomComposer.addPass(outputPass);

  const uniforms = {
    u_time: { type: "f", value: 0.0 },
    u_frequency: { type: "f", value: 0.0 },
    u_red: { type: "f", value: 1.0 },
    u_green: { type: "f", value: 0.5 },
    u_blue: { type: "f", value: 0.25 },
  };

  window.bloomComposer = bloomComposer;
  window.uniforms = uniforms;

  const mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(12, 30),
    new THREE.ShaderMaterial({
      uniforms,
      blendColor: true,
      vertexShader: document.getElementById("vertexshader").textContent,
      fragmentShader: document.getElementById("fragmentshader").textContent,
    })
  );
  mesh.material.wireframe = true;

  const listener = new THREE.AudioListener();
  camera.add(listener);

  // TODO: figure why this doesnt work ?
  // const sound = new THREE.PositionalAudio(listener);

  const sound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();

  audioLoader.load("./sounds/afx.mp3", function (buffer) {
    sound.setBuffer(buffer);
    sound.setVolume(0.5);
    // sound.setRefDistance(10);
    // sound.play();
  });

  const analyser = new THREE.AudioAnalyser(sound);
  window.analyser = analyser;

  return { mesh, sound, listener };
}
