import { Entity } from "./entity";

// TODO: entity used for objects affected by physics
export class EntityMover extends Entity {
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
}
