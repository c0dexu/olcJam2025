import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export class CameraObject {
  camera;
  controls;
  target;
  distance = 8;
  offset = new THREE.Matrix4().makeRotationY(Math.PI).setPosition(0, -15, -64);

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
      // new THREE.Vector3().applyEuler();
      const temp = new THREE.Matrix4().lookAt(
        this.camera.position,
        this.target.mesh.position,
        this.target.mesh.up
      );

      const targetMatPos = new THREE.Matrix4().copyPosition(targetMat);

      this.camera.matrixWorld.copy(
        targetMatPos.multiply(temp).multiply(this.offset)
      );
      this.camera.updateMatrixWorld();
    }
  }
}
