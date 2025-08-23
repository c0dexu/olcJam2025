import { hashArray } from "three/src/nodes/core/NodeUtils.js";
import { MeshBody } from "../meshbody";

// entity should only hold position and mesh info
export class Entity {
  meshBody;
  geometry_type;
  mesh;
  x0;
  y0;
  z0;

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

  addToScene(scene) {
    scene.add(this.mesh);
  }
}
