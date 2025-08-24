import * as THREE from "three";
import { World } from "./src/world/world";

const canvasContainer = document.getElementsByClassName("canvas-container")[0];
const btnConfirm = document.getElementById("btn-confirm");
let isDialogOpen = true;

function app() {
  const renderer = new THREE.WebGLRenderer();
  canvasContainer.appendChild(renderer.domElement);
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientWidth);
  console.log("RENDERER", renderer);
  const world = new World(renderer);
  world.addEntity(0, 0, 0, 0.5, "BOX", null, 0x32a852);
  world.initRenderer(renderer);
  world.start();
}

btnConfirm.addEventListener("click", () => {
  if (isDialogOpen) {
    setTimeout(() => {
      app();
    }, 500);
    btnConfirm.parentElement.parentElement.parentElement.style.display = "none";
    isDialogOpen = false;
  }
});
