import { Entity } from "./entity";

export class Planet extends Entity {
  scene;
  geometry;
  material;
  color;
  radius;
  influence;
  x0;
  y0;
  z0;

  constructor(scene, x0, y0, z0, color, texture_path = null, radius) {
    super(scene, x0, y0, z0, "SPHERE", texture_path, color, [radius]);
    this.scene = scene;
    this.x0 = x0;
    this.y0 = y0;
    this.z0 = z0;
    this.color = this.color;
    this.radius = radius;
    this.influence = this.radius * 2;
  }
}
