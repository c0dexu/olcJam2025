import * as THREE from "three";
import { World } from "./src/world/world";
import { PlayerController } from "./src/playercontroller/playercontroller";

const canvasContainer = document.getElementsByClassName("canvas-container")[0];
const btnConfirm = document.getElementById("btn-confirm");
let isDialogOpen = true;

function app() {
  const renderer = new THREE.WebGLRenderer();
  canvasContainer.appendChild(renderer.domElement);
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientWidth);
  console.log("RENDERER", renderer);

  setTimeout(() => {
    const controller = new PlayerController(document);
    controller.listen();
    const world = new World(renderer);
    world.initWorld(renderer);
    world.addEntity(
      0,
      0,
      0,
      0.5,
      "CYLINDER",
      "texture_test.png",
      0x32a852,
      [4, 4, 4]
    );
    world.addPlanet(10, 10, 0, 0x3295a8, 16);
    world.start();
  }, 500);
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
