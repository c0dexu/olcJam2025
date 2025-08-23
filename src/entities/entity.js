import { MeshBody } from "../meshbody";

export class Entity {
  x0;
  y0;
  z0;
  meshBody;
  geometry_type;
  mesh;

  constructor(x0, y0, z0, geometry_type, texture_path, color, args) {
    this.meshBody = new MeshBody(
      x0,
      y0,
      z0,
      geometry_type,
      color,
      texture_path,
      args
    );
    this.meshBody.initMesh();
    this.mesh = this.meshBody.mesh;
  }
}
