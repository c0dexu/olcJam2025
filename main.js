import * as THREE from "three";
import { GameState } from "./src/game_state/game_state";

const canvasContainer = document.getElementsByClassName("canvas-container")[0];
const btnConfirm = document.getElementById("btn-confirm");
let isDialogOpen = true;

function app() {
  const renderer = new THREE.WebGLRenderer();
  canvasContainer.appendChild(renderer.domElement);
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientWidth);
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
