import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export class Camera {
  camera;
  controls;
  target;
  distance = 8;

  constructor(renderer) {
    fetch("./camera.config.json")
      .then((response) => response.json())
      .then((data) => {
        this.camera = new THREE.PerspectiveCamera(
          data.fov,
          data.aspect,
          data.near,
          data.far
        );
        this.controls = new OrbitControls(this.camera, renderer.domElement);
      })
      .catch((reason) => {
        console.log(`ERROR: ${reason}. Using default params...`);
        this.camera = new THREE.PerspectiveCamera(70, 2, 55, 3.4);
      });
  }

  setTarget(target) {
    this.target = target;
  }

  setPosition(x, y, z) {
    if (this.target) {
      this.camera.position.set(
        this.target.position.x + x * this.distance,
        this.target.position.y + y * this.distance,
        this.target.position.z + z * this.distance
      );
    } else {
      this.camera.position.set(
        x * this.distance,
        y * this.distance,
        z * this.distance
      );
    }
    this.controls.update();
  }
}
