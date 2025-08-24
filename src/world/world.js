import * as THREE from "three";
import { Camera } from "../camera/camera";
import { EntityMover } from "../entities/entitymover";

export class World {
  entities = new Map();
  cameraObj;
  skybox;
  renderer;
  scene;
  light;

  constructor() {
    this.scene = new THREE.Scene();
    this.light = new THREE.HemisphereLight(0xffffff, 0xa3a3a3, 5);
    this.cameraObj = new Camera(this.renderer);
  }

  initRenderer(renderer) {
    this.renderer = this.renderer;
  }

  addEntity(x0, y0, z0, mass, geometry_type, texture_path, color) {
    const entity = new EntityMover(
      this.scene,
      x0,
      y0,
      z0,
      mass,
      geometry_type,
      texture_path,
      color
    );

    this.entities.set(entity.mesh.uuid, entity);
    entity.addToScene();
  }

  getEntity(id) {
    return this.entities.get(id);
  }

  gameloop(time) {
    time *= 0.01;
    console.log("renderer", this.renderer);
    this.renderer.render(this.scene, this.cameraObj.camera);
    requestAnimationFrame(this.gameloop);
  }

  start() {
    if (this.renderer) {
      requestAnimationFrame(this.gameloop);
    }
  }
}
