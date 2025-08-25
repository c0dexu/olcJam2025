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

  setTimeout(() => {
    const controller = new PlayerController(document);
    controller.listen();
    const world = new World(renderer);
    world.initWorld(renderer);
    world.addEntity(
      256,
      -128,
      -128,
      0.5,
      "ICOSAHEDRON",
      "texture_test.png",
      0xffffff,
      [4, 4, 4]
    );
    world.addPlanet(0, 0, 0, 0x74b370, 128, "grass.png");
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
