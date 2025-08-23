import * as THREE from "three";

function main() {
  const canvasContainer =
    document.getElementsByClassName("canvas-container")[0];
  const renderer = new THREE.WebGLRenderer();
  canvasContainer.appendChild(renderer.domElement);
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientWidth);
}

main();
