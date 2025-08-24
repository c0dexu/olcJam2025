import * as THREE from "three";
import { CameraObject } from "../camera/cameraobj";
import { EntityMover } from "../entities/entitymover";
import { Planet } from "../entities/planet";
import { distance } from "../utils";

export class World {
  entities = new Map();
  planets = [];
  cameraObj;
  skybox;
  renderer;
  scene;
  light;
  MAX_DIST_PLANET = 2048;

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
    this.planets.push(planet);
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

  findNearestPlanet(meshId) {
    const entity = this.entities.get(meshId);
    const filteredPlanets = this.planets.filter((planet) => {
      const dist = distance(
        entity.mesh.position.x,
        entity.mesh.position.y,
        entity.mesh.position.z,
        planet.x0,
        planet.y0,
        planet.z0
      );
      return dist < this.MAX_DIST_PLANET;
    });
    const nearestPlanet = filteredPlanets.find((planet) => {
      const radius = planet.radius;
      const intensity = planet.intensity;
      const dist = distance(
        entity.mesh.position.x,
        entity.mesh.position.y,
        entity.mesh.position.z,
        planet.x0,
        planet.y0,
        planet.z0
      );
      return dist <= radius + intensity;
    });
    return nearestPlanet;
  }

  start() {
    requestAnimationFrame(this.gameloop);
  }
}
