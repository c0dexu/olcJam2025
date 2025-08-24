import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export class CameraObject {
  camera;
  controls;
  target;
  distance = 8;

  constructor(renderer) {
    this.camera = new THREE.PerspectiveCamera(70, 2, 3.4, 1000);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
  }

  setTarget(target) {
    this.target = target;
  }

  setPosition(x, y, z) {
    if (this.target) {
      // this.camera.position.set(
      //   this.target.position.x + x * this.distance,
      //   this.target.position.y + y * this.distance,
      //   this.target.position.z + z * this.distance
      // );
      this.controls.target = new THREE.Vector3(
        this.target.mesh.position.x,
        this.target.mesh.position.y,
        this.target.mesh.position.z
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
