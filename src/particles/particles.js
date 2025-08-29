import * as THREE from "three";

export class Particles {
  max_timer = 50;
  timer = this.max_timer;
  speed = 0.14;
  obj = new THREE.Object3D();
  camera;
  scene;
  parts = [];
  direction = new THREE.Vector3(0, 1, 0);
  max_particles = 10;
  spread = 4;
  generated = false;

  constructor(camera, scene, x0, y0, z0, texture_path = null) {
    this.camera = camera;
    this.scene = scene;
    this.scene.add(this.obj);
    this.obj.position.set(x0, y0, z0);
  }

  setPosition(x, y, z) {
    this.obj.position.set(x, y, z);
  }

  generateParticles() {
    const n = Math.floor(Math.random() * this.max_particles);

    if (!this.generated) {
      for (let i = 0; i < n; i++) {
        const pg = new THREE.PlaneGeometry(3, 3);
        const pmat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const pmesh = new THREE.Mesh(pg, pmat);
        this.parts.push(pmesh);
        this.obj.add(pmesh);
      }
      this.generated = true;
    }
  }

  removeParticles() {
    const len = this.parts.length;
    for (let i = 0; i < len; this.parts) {
      this.obj.remove(p);
      p.geometry.dispose();
      p.material.dispose();
      this.parts.pop();
    }
  }

  updateParticles() {
    for (let p of this.parts) {
      const px = p.position.x;
      const py = p.position.y;
      const pz = p.position.z;

      p.position.set(
        px + this.direction.x * this.speed,
        py + this.direction.y * this.speed,
        pz + this.direction.z * this.speed
      );
    }
  }

  emit() {
    this.generateParticles();

    if (this.timer > 0) {
      this.updateParticles();
    }

    if (this.timer <= 0) {
      this.generated = false;
      this.removeParticles();
    }

    this.timer--;
  }

  destroyParticles() {
    if (this.scene) {
      this.scene.remove(this.obj);
    }
  }
}
