import * as THREE from "three";

const canvasContainer = document.getElementsByClassName("canvas-container")[0];
const renderer = new THREE.WebGLRenderer();
canvasContainer.appendChild(renderer.domElement);
renderer.setAnimationLoop(animate);
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientWidth);
renderer.setAnimationLoop(animate);
