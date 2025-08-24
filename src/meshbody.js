import * as THREE from "three";

export class MeshBody {
  SEGMENTS = 16;
  geometry_type;
  boundingSphere;
  geometry;
  material;
  mesh;
  texture_path;
  texture;
  color;
  args;
  p0;

  constructor(
    x0,
    y0,
    z0,
    geometry_type,
    color,
    texture_path = null,
    args = []
  ) {
    this.geometry_type = geometry_type;
    this.color = color;
    this.texture_path = texture_path;
    this.args = args;
    this.p0 = new THREE.Vector3(x0, y0, z0);
  }

  initMesh() {
    this.createGeometry();
    this.createMaterial();
    if (this.geometry && this.material) {
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(this.p0.x, this.p0.y, this.p0.z);
    }
  }

  createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      color: this.color,
    });

    if (this.texture_path) {
      const loader = new THREE.TextureLoader();
      const texture = loader.load(`assets/textures/${this.texture_path}`);
      texture.colorSpace = THREE.SRGBColorSpace;
      material.map = texture;
      this.texture = texture;
    }

    this.material = material;
  }

  calculateBoundingSphere() {
    this.boundingSphere = this.geometry.boundingSphere();
  }

  createGeometry() {
    switch (this.geometry_type) {
      case "BOX":
        this.geometry = new THREE.BoxGeometry(
          this.args[0],
          this.args[1],
          this.args[2]
        );
        break;

      case "CONE":
        this.geometry = new THREE.ConeGeometry(
          this.args[0],
          this.args[1],
          this.SEGMENTS
        );
        break;

      case "CYLINDER":
        this.geometry = new THREE.CylinderGeometry(
          this.args[0],
          this.args[0],
          this.args[1],
          this.SEGMENTS
        );
        break;

      case "SPHERE":
        this.geometry = new THREE.SphereGeometry(
          this.args[0],
          this.SEGMENTS,
          this.SEGMENTS
        );
        break;

      case "ICOSAHEDRON":
        this.geometry = new THREE.IcosahedronGeometry(this.args[0]);
        break;
    }
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.texture.dispose();
  }
}
