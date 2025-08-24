import { hashArray } from "three/src/nodes/core/NodeUtils.js";
import { MeshBody } from "../meshbody";

export class Entity {
  scene;
  meshBody;
  geometry_type;
  mesh;
  x0;
  y0;
  z0;

  constructor(scene, x0, y0, z0, geometry_type, texture_path, color, args) {
    this.scene = scene;
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

  addToScene() {
    this.scene.add(this.mesh);
  }

  getMeshBody() {
    return this.meshBody;
  }
}
