import * as THREE from "three";
import { CameraObject } from "../camera/cameraobj";
import { EntityMover } from "../entities/entitymover";
import { Planet } from "../entities/planet";

export class World {
  entities = new Map();
  planets = new Map();
  cameraObj;
  skybox;
  renderer;
  scene;
  light;

  constructor() {}

  initWorld(renderer) {
    this.scene = new THREE.Scene();
    this.light = new THREE.HemisphereLight(0xffffff, 0xa3a3a3, 5);
    // this.light = new THREE.AmbientLight(0xffffff, 5);
    this.renderer = renderer;
    this.cameraObj = new CameraObject(this.renderer);
    this.cameraObj.setPosition(5, 0, 0);
    this.scene.add(this.light);
  }

  addEntity(x0, y0, z0, mass, geometry_type, texture_path, color, args) {
    const entity = new EntityMover(
      this.scene,
      x0,
      y0,
      z0,
      mass,
      geometry_type,
      texture_path,
      color,
      args
    );

    this.entities.set(entity.mesh.uuid, entity);
    entity.addToScene();
  }
  addPlanet(x0, y0, z0, color, radius, texture_path = null) {
    const planet = new Planet(
      this.scene,
      x0,
      y0,
      z0,
      color,
      texture_path,
      radius
    );
    this.planets.set(planet.mesh.id, planet);
    planet.addToScene();
  }

  getEntity(id) {
    return this.entities.get(id);
  }

  gameloop = (time) => {
    time *= 0.01;
    this.renderer.render(this.scene, this.cameraObj.camera);
    requestAnimationFrame(this.gameloop);
  };

  start() {
    requestAnimationFrame(this.gameloop);
  }
}
