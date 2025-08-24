import { normal, vectorDistance } from "../utils";
import { Entity } from "./entity";

// TODO: entity used for objects affected by physics
export class EntityMover extends Entity {
  GRAV_ACC = 0.1;
  scene;
  health = 1;
  geometry_type;
  texture_path = null;
  color;
  args = [];
  deltaTime = 0.01;

  /* Initial position */
  x0;
  y0;
  z0;

  /* velocity */
  vx = 0;
  vy = 0;
  vz = 0;

  /* force and mass */
  mass;
  fx = 0;
  fy = 0;
  fz = 0;

  /* g force */
  gx = 0;
  gy = 0;
  gz = 0;

  /* reaction */
  rx = 0;
  ry = 0;
  rz = 0;

  isMoving = false;
  isDead = false;
  hasJumped = false;
  isInAir = false;
  isColliding = false;
  planet = null;

  constructor(
    scene,
    x0,
    y0,
    z0,
    mass,
    geometry_type,
    texture_path,
    color,
    args
  ) {
    super(scene, x0, y0, z0, geometry_type, texture_path, color, args);
    this.scene = scene;
    this.mass = mass;
    this.x0 = x0;
    this.y0 = y0;
    this.z0 = z0;
    this.geometry_type = geometry_type;
    this.texture_path = texture_path;
    this.color = color;
    this.args = args;
  }

  addToScene() {
    super.addToScene();
  }

  attachPlanet(planet) {
    this.planet = planet;
  }

  update() {
    if (this.planet) {
      const xplanet = this.planet.x0;
      const yplanet = this.planet.y0;
      const zplanet = this.planet.z0;
      const x = this.mesh.position.x;
      const y = this.mesh.position.y;
      const z = this.mesh.position.z;
      const unit = normal(xplanet, yplanet, zplanet, x, y, z);
      this.gx = this.GRAV_ACC * unit[0];
      this.gy = this.GRAV_ACC * unit[1];
      this.gz = this.GRAV_ACC * unit[2];
    }

    this.vx += this.gx * this.deltaTime;
    this.vy += this.gy * this.deltaTime;
    this.vz += this.gz * this.deltaTime;

    const xpos = this.mesh.position.x;
    const ypos = this.mesh.position.y;
    const zpos = this.mesh.position.z;

    this.mesh.position.set(xpos + this.vx, ypos + this.vy, zpos + this.vz);
  }
}
