import * as THREE from "three";
import { CameraObject } from "../camera/cameraobj";
import { EntityMover } from "../entities/entitymover";
import { Planet } from "../entities/planet";
import { distance } from "../utils";
import { PlayerController } from "../playercontroller/playercontroller";
import { geometry_types } from "../meshbody";

export class World {
  entities = new Map();
  planets = [];
  cameraObj;
  skybox;
  renderer;
  scene;
  light;
  MAX_DIST_PLANET = 2048;
  MAX_ENTITIES = 78;
  controller = new PlayerController(document);

  constructor() {}

  initWorld(renderer) {
    this.scene = new THREE.Scene();
    this.light = new THREE.HemisphereLight(0xffffff, 0xa3a3a3, 5);
    // this.light = new THREE.AmbientLight(0xffffff, 5);
    this.renderer = renderer;
    this.cameraObj = new CameraObject(this.renderer);
    this.cameraObj.distance = 54;
    // this.cameraObj.setPosition(5, 0, 0);
    this.scene.add(this.light);
    const loader = new THREE.TextureLoader();
    loader.load("../assets/textures/skybox_bluesky.png", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      this.scene.background = texture;
    });
  }

  addEntity(
    x0,
    y0,
    z0,
    mass,
    geometry_type,
    texture_path,
    color,
    args,
    isBot = true
  ) {
    const entity = new EntityMover(
      this.scene,
      x0,
      y0,
      z0,
      mass,
      geometry_type,
      texture_path,
      color,
      args,
      isBot
    );
    this.entities.set(entity.mesh.uuid, entity);
    entity.sound = new THREE.PositionalAudio(this.cameraObj.audioListener);
    entity.audioLoader.load("assets/sounds/jump.mp3", (buffer) => {
      entity.sound.setBuffer(buffer);
      entity.sound.setRefDistance(16);
      entity.sound.setMaxDistance(64);
      // entity.sound.add(entity.mesh);
      entity.mesh.add(entity.sound);
    });
    entity.addToScene();

    return entity;
  }

  setCameraTarget(entity) {
    this.controller.setEntity(entity);
    this.controller.setCamera(this.cameraObj);
    this.controller.listen();
    this.cameraObj.setTarget(entity);
    entity.camera = this.cameraObj.camera;
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

  generateRandomEntities() {
    const n = THREE.MathUtils.randInt(5, this.MAX_ENTITIES);
    let firstPlayer = false;
    for (let planet of this.planets) {
      for (let i = 0; i < n; i++) {
        const textures = [
          "surface0.png",
          "surface1.png",
          "surface2.png",
          "surface3.png",
          "surface4.png",
          "surface5.png",
          "surface6.png",
        ];

        const geometries = geometry_types;
        const xp = planet.mesh.position.x;
        const yp = planet.mesh.position.y;
        const zp = planet.mesh.position.z;
        const planetPosition = new THREE.Vector3(xp, yp, zp);
        const xd = Math.random();
        const yd = Math.random();
        const zd = Math.sqrt(1 - xd * xd + yd * yd);
        const direction = new THREE.Vector3(xd, yd, zd);
        const ds = direction.multiplyScalar(planet.radius);
        const entityPosition = planetPosition.add(ds);

        const dx = entityPosition.x - planetPosition.x;
        const dy = entityPosition.y - planetPosition.y;
        const dz = entityPosition.z - planetPosition.z;

        const u = new THREE.Vector3(dx, dy, dz).normalize();
        const projection = ds.dot(u);

        const corrected_u = u.multiplyScalar(projection);
        entityPosition.set(
          planetPosition.x + corrected_u.x,
          planetPosition.y + corrected_u.y,
          planetPosition.z + corrected_u.z
        );

        const selectedGeometry =
          geometries[THREE.MathUtils.randInt(0, geometries.length - 1)];

        const selectedTexture =
          textures[THREE.MathUtils.randInt(0, textures.length - 1)];

        const r = THREE.MathUtils.randInt(0, 255);
        const g = THREE.MathUtils.randInt(0, 255);
        const b = THREE.MathUtils.randInt(0, 255);

        const args = [
          THREE.MathUtils.randInt(5, 25),
          THREE.MathUtils.randInt(5, 25),
          THREE.MathUtils.randInt(5, 25),
        ];

        const entity = this.addEntity(
          entityPosition.x,
          entityPosition.y,
          entityPosition.z,
          0.5,
          selectedGeometry,
          selectedTexture,
          `rgb(${r},${g},${b})`,
          args,
          i > 0
        );

        if (i === 0) {
          this.setCameraTarget(entity);
        }
      }
    }
  }

  gameloop = (time) => {
    time *= 0.01;
    this.cameraObj.followTarget();

    this.entities.forEach((e, k, _) => {
      const nearestPlanet = this.findNearestPlanet(e.mesh.uuid);
      const planet = e.planet;
      this.controller.updateReaction();
      if (
        nearestPlanet &&
        (!planet || (planet && planet.mesh.uuid !== nearestPlanet.mesh.uuid))
      ) {
        e.attachPlanet(nearestPlanet);
      }
      e.update();
    });

    const canvas = this.renderer.domElement;
    this.cameraObj.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.cameraObj.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.cameraObj.camera);
    requestAnimationFrame(this.gameloop);
  };

  findNearestPlanet = (meshId) => {
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
      const influence = planet.influence;
      const dist = distance(
        entity.mesh.position.x,
        entity.mesh.position.y,
        entity.mesh.position.z,
        planet.x0,
        planet.y0,
        planet.z0
      );
      return dist <= radius + influence;
    });
    return nearestPlanet;
  };

  generateRandomWorld(n = 10, p_planet = 0.6, p_entity = 0.4) {
    for (let i = 0; i < n; i++) {
      const p0 = Math.random();
      const p1 = Math.random();

      if (p0 > p_planet) {
        // TODO: generate planet
      }

      if (p1 > p_entity) {
        // TODO: generate_entity
      }
    }
  }

  start() {
    requestAnimationFrame(this.gameloop);
  }
}
