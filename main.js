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
    const world = new World(renderer);
    world.initWorld(renderer);
    const player = world.addEntity(
      256,
      -400,
      -400,
      0.5,
      "CYLINDER",
      "surface2.png",
      0xffffff,
      [8, 8, 8],
      false
    );
    world.setCameraTarget(player);
    world.addPlanet(0, 0, 0, 0xffffff, 256, "surface3.png");
    world.addPlanet(2024, 0, 0, 0x43ab7e, 1024, "grass.png");
    world.addPlanet(-256, 1024, 256, 0x43ab7e, 512, "grass.png");
    setTimeout(() => {
      world.start();
      world.generateRandomEntities();
    }, 200);
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
