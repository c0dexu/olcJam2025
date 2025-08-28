import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { normal, vectorDistance } from "../utils";
import { clamp } from "three/src/math/MathUtils.js";

export class CameraObject {
  camera;
  controls;
  target;
  distance = 256;
  offset = new THREE.Matrix4();

  final = new THREE.Matrix4();
  vec = new THREE.Vector3();
  targetRelativePosition = new THREE.Vector3();
  cameraRelativePosition = new THREE.Vector3();
  camRelToTarget = new THREE.Vector3();
  theta = 0;
  alpha = 0;
  rotA = 0;
  rotB = 0;
  zoomReact = 0;
  audioListener = new THREE.AudioListener();

  constructor(renderer) {
    this.camera = new THREE.PerspectiveCamera(70, 2, 3.4, 10000);
    // this.controls = new OrbitControls(this.camera, renderer.domElement);
    // this.camera.position.set(128, 128, 0);
    this.camera.matrixAutoUpdate = false;
    this.camera.position.set(10, 0, 0);
    this.camera.add(this.audioListener);
  }

  setTarget(target) {
    this.target = target;
  }

  zoom(sign) {
    this.distance += 0.1 * sign;
  }

  followTarget() {
    if (this.target && this.target.planet) {
      const planet = this.target.planet;
      const planetMesh = planet.mesh;
      const targetMesh = this.target.mesh;
      const planetMatrix = planetMesh.matrixWorld;
      const targetMat = this.target.mesh.matrixWorld;
      const targetPos = new THREE.Matrix4().copyPosition(targetMat);

      const rel0 = vectorDistance(
        this.camera.position.x,
        this.camera.position.y,
        this.camera.position.z,
        planetMesh.position.x,
        planetMesh.position.y,
        planetMesh.position.z
      );

      this.cameraRelativePosition.x = rel0[0];
      this.cameraRelativePosition.y = rel0[1];
      this.cameraRelativePosition.z = rel0[2];

      const rel1 = vectorDistance(
        targetMesh.position.x,
        targetMesh.position.y,
        targetMesh.position.z,
        planetMesh.position.x,
        planetMesh.position.y,
        planetMesh.position.z
      );

      this.targetRelativePosition.x = rel1[0];
      this.targetRelativePosition.y = rel1[1];
      this.targetRelativePosition.z = rel1[2];

      const rel2 = vectorDistance(
        this.camera.position.x,
        this.camera.position.y,
        this.camera.position.z,
        targetMesh.position.x,
        targetMesh.position.y,
        targetMesh.position.z
      );

      this.camRelToTarget.x = rel2[0];
      this.camRelToTarget.y = rel2[1];
      this.camRelToTarget.z = rel2[2];

      this.camRelToTarget = this.camRelToTarget.normalize().multiplyScalar(256);

      if (this.zoomReact != 0) {
        this.distance += 0.25 * this.zoomReact;
        this.distance = clamp(this.distance, 16, 256);
      }

      this.offset = new THREE.Matrix4().setPosition(
        new THREE.Vector3(0, 0, this.distance)
      );

      const camRot = new THREE.Matrix4().lookAt(
        this.camera.position,
        planetMesh.position,
        new THREE.Vector3(0, 1, 0)
      );

      this.camera.matrixWorld.copy(
        targetPos
          .multiply(camRot)

          .multiply(new THREE.Matrix4().makeRotationY(this.alpha))
          .multiply(this.offset)
      );

      this.alpha += 0.01 * this.rotB;
      this.theta += 0.01 * this.rotA;

      this.camera.updateMatrixWorld();
    }
  }
}
