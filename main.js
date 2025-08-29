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
    world.addEntity(
      256,
      -400,
      -400,
      0.5,
      "CYLINDER",
      "surface2.png",
      0xffffff,
      [8, 8, 8]
    );
    world.addEntity(
      256,
      -256,
      -256,
      0.5,
      "BOX",
      "surface1.png",
      0xffffff,
      [16, 16, 16]
    );
    world.setCameraTarget();
    world.addPlanet(0, 0, 0, 0xffffff, 256, "surface3.png");
    world.addPlanet(2024, 0, 0, 0x43ab7e, 1024, "grass.png");

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
