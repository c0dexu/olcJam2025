import {
  cartesian_to_spherical,
  distance,
  dot,
  normal,
  units_sphere,
  vectorDistance,
} from "../utils";
import { Entity } from "./entity";
import * as THREE from "three";

// TODO: entity used for objects affected by physics
export class EntityMover extends Entity {
  GRAV_ACC = 0.25;
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

  mx = 0;
  my = 0;
  mz = 0;

  tx = 0;
  ty = 0;
  tz = 0;

  tmax = 0.5;

  isMoving = false;
  isDead = false;
  hasJumped = false;
  isInAir = false;
  isCollidingWithPlanet = false;
  planet = null;
  alpha = Math.PI / 2;

  lineMaterial;
  lineGeometry;
  line;
  rotation = 0;
  gain = 0;
  theta = 0;
  phi = 0;

  hx = 0;
  hy = 0;
  h = 0.15;

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
    this.lineGeometry = new THREE.BufferGeometry();
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.line = new THREE.Line(this.lineGeometry, this.lineMaterial);
    this.scene.add(this.line);
    this.getMeshBody().calculateBoundingSphere();
  }

  addToScene() {
    super.addToScene();
  }

  attachPlanet(planet) {
    this.planet = planet;
  }

  checkPlanetCollision = () => {
    if (!this.planet) return;
    const xplanet = this.planet.x0;
    const yplanet = this.planet.y0;
    const zplanet = this.planet.z0;
    const nextX = this.mesh.position.x + this.vx * this.deltaTime;
    const nextY = this.mesh.position.y + this.vy * this.deltaTime;
    const nextZ = this.mesh.position.z + this.vz * this.deltaTime;
    const dist = distance(nextX, nextY, nextZ, xplanet, yplanet, zplanet);
    const unit = normal(xplanet, yplanet, zplanet, nextX, nextY, nextZ);
    this.isCollidingWithPlanet =
      dist < this.getMeshBody().boundingSphere.radius + this.planet.radius;
    if (this.isCollidingWithPlanet) {
      this.rx = -this.gx;
      this.ry = -this.gy;
      this.rz = -this.gz;
      this.rx = 0;
      this.ry = 0;
      this.rz = 0;
      this.gx = 0;
      this.gy = 0;
      this.gz = 0;

      const k = dot(this.vx, this.vy, this.vz, unit[0], unit[1], unit[2]);
      this.vx -= 2 * unit[0] * k;
      this.vy -= 2 * unit[1] * k;
      this.vz -= 2 * unit[2] * k;

      this.vx *= 0.7;
      this.vy *= 0.7;
      this.vz *= 0.7;

      if (distance(0, 0, 0, this.vx, this.vy, this.vz) < 0.001) {
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
      }
    }
  };

  update = () => {
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
      const dist_vec = vectorDistance(x, y, z, xplanet, yplanet, zplanet);

      this.mesh.up = new THREE.Vector3(unit[0], unit[1], unit[2]);

      const spherical = cartesian_to_spherical(
        dist_vec[0],
        dist_vec[1],
        dist_vec[2]
      );

      this.theta = spherical[1];
      this.phi = spherical[2];

      const reference = units_sphere(this.theta, this.phi);

      // V = Vx * u1 + Vy * u2
      // Vx = |V| * cos(alpha)
      // Vy = |v| * sin(alpha)

      this.hx = -this.h * Math.sin(this.alpha);
      this.hy = this.h * Math.cos(this.alpha);

      const ux = Math.cos(this.alpha);
      const uy = -Math.sin(this.alpha);

      // const temp = new THREE.Mesh().setRotationFromAxisAngle(axis);

      this.mesh.setRotationFromAxisAngle(
        new THREE.Vector3(ux, 0, uy),
        this.rotation
      );
      this.rotation += 0.01;

      this.tx = -(reference.u1[0] * this.hx + reference.u2[0] * this.hy);
      this.ty = -(reference.u1[1] * this.hx + reference.u2[1] * this.hy);
      this.tz = -(reference.u1[2] * this.hx + reference.u2[2] * this.hy);

      // console.log(-reference.u2[0], -reference.u2[1], -reference.u2[2]);

      // console.log(`theta = ${theta}; phi = ${phi}`);

      this.line.geometry.setFromPoints([
        new THREE.Vector3(
          this.mesh.position.x,
          this.mesh.position.y,
          this.mesh.position.z
        ),
        new THREE.Vector3(
          this.mesh.position.x + reference.u1[0] * 16,
          this.mesh.position.y + reference.u1[1] * 16,
          this.mesh.position.z + reference.u1[2] * 16
        ),
      ]);

      this.checkPlanetCollision();
    }

    this.vx += (this.gx + this.rx) * this.deltaTime;
    this.vy += (this.gy + this.ry) * this.deltaTime;
    this.vz += (this.gz + this.rz) * this.deltaTime;

    this.mx = this.vx + this.tx;
    this.my = this.vy + this.ty;
    this.mz = this.vz + this.tz;

    const xpos = this.mesh.position.x;
    const ypos = this.mesh.position.y;
    const zpos = this.mesh.position.z;

    this.mesh.position.set(xpos + this.mx, ypos + this.my, zpos + this.mz);
  };
}
