import { vectorDistance } from "../utils";
import * as THREE from "three";

export class BotController {
  hor = 0;
  vert = 0;
  jmp = 0;
  isUpdating = false;
  entity;
  vecDist = new THREE.Vector3();
  JMP_THRESHOLD = 2.5;
  angle = 0;
  MAX_TIMER = 500;
  IDLE_TIME = THREE.MathUtils.randInt(500, 800);
  timewait = this.IDLE_TIME;
  timer = this.MAX_TIMER;
  jmp_prob = 0.34;
  hor_prob = 0.54;
  vert_prob = 0.64;
  once = false;

  jump(flag) {
    this.jmp = flag;
  }

  setEntity = (entity) => {
    this.entity = entity;
  };

  // moveRandomly(x0, y0, z0) {
  //   if (this.entity && this.entity.planet) {
  //     const planet = this.entity.planet;
  //     const planetPosition = planet.mesh.position;
  //     const entityPosition = this.entity.mesh.position;
  //     const xp = planetPosition.x;
  //     const yp = planetPosition.y;
  //     const zp = planetPosition.z;
  //     const vecDistEntity = vectorDistance(
  //       entityPosition.x,
  //       entityPosition.y,
  //       entityPosition.z,
  //       xp,
  //       yp,
  //       zp
  //     );

  //     const vecDistTarget = vectorDistance(x0, y0, z0, xp, yp, zp);

  //     const dx = vecDistTarget[0] - vecDistEntity[0];
  //     const dy = vecDistTarget[1] - vecDistEntity[1];
  //     const dz = vecDistTarget[2] - vecDistEntity[2];

  //     const entityNormal = new THREE.Vector3(
  //       vecDistEntity[0],
  //       vecDistEntity[1],
  //       vecDistEntity[2]
  //     ).normalize();

  //     this.vecDist.set(dx, dy, dz);

  //     const projection = entityNormal.dot(this.vecDist);

  //     this.jmp = projection > this.JMP_THRESHOLD;
  //   }
  // }

  update() {
    if (this.timewait > 0 && !this.isUpdating) {
      this.timewait--;
    }

    if (this.timewait <= 0) {
      this.timewait = THREE.MathUtils.randInt(100, 200);
      this.isUpdating = true;
    }

    if (!this.isUpdating) {
      this.moveRandomly();
    }
  }

  moveRandomly() {
    if (!this.once) {
      this.once = true;
      const p_jump = Math.random();
      const p_vert = Math.random();
      const p_hor = Math.random();

      if (p_hor <= this.hor_prob) {
        this.hor = THREE.MathUtils.randInt(-1, 1);
      }

      if (p_vert <= this.vert_prob) {
        this.vert = THREE.MathUtils.randInt(-1, 1);
      }

      if (p_jump <= this.jmp_prob) {
        this.jmp = THREE.MathUtils.randInt(0, 1);
      }
    }
    if (this.timer > 0) {
      this.timer--;
    }

    if (this.timer <= 0) {
      this.timer = this.MAX_TIMER;
      this.isUpdating = false;
      this.once = false;
    }
  }
}
