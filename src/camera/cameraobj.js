import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export class CameraObject {
  camera;
  controls;
  target;
  distance = 8;
  offset = new THREE.Matrix4().makeRotationY(Math.PI).setPosition(0, -32, -128);

  final = new THREE.Matrix4();

  constructor(renderer) {
    this.camera = new THREE.PerspectiveCamera(70, 2, 3.4, 1000);
    // this.controls = new OrbitControls(this.camera, renderer.domElement);
    // this.camera.position.set(128, 128, 0);
    this.camera.matrixAutoUpdate = false;
  }

  setTarget(target) {
    this.target = target;
  }

  followTarget() {
    if (this.target) {
      const targetMat = this.target.mesh.matrixWorld;
      // const offset = targetMat.invert().multiply(this.camera.matrixWorld);
      // const offsetPos = new THREE.Matrix4().copyPosition(offset);
      // const temp = this.camera.matrixWorld.multiply(offsetPos);
      // this.camera.matrixWorld.copy(offset);
      const temp = new THREE.Matrix4().lookAt(
        this.camera.position,
        this.target.mesh.position,
        this.target.mesh.up
      );
      this.camera.matrixWorld.copy(
        targetMat.multiply(temp).multiply(this.offset)
      );
      this.camera.updateMatrixWorld();
    }
  }
}
