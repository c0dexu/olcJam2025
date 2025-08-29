import { vectorDistance } from "../utils";
import * as THREE from "three";

export class BotController {
  hor = 0;
  vert = 0;
  jmp = 0;
  isMovingTowardsTarget = false;
  entity;
  vecDist = new THREE.Vector3();
  JMP_THRESHOLD = 2.5;
  angle = 0;
  MAX_TIMER = 100;
  timer = this.MAX_TIMER;

  jump(flag) {
    this.jmp = flag;
  }

  setEntity = (entity) => {
    this.entity = entity;
  };

  moveTowards(x0, y0, z0) {
    if (this.entity && this.entity.planet) {
      const planet = this.entity.planet;
      const planetPosition = planet.mesh.position;
      const entityPosition = this.entity.mesh.position;
      const xp = planetPosition.x;
      const yp = planetPosition.y;
      const zp = planetPosition.z;
      const vecDistEntity = vectorDistance(
        entityPosition.x,
        entityPosition.y,
        entityPosition.z,
        xp,
        yp,
        zp
      );

      const vecDistTarget = vectorDistance(x0, y0, z0, xp, yp, zp);

      const dx = vecDistTarget[0] - vecDistEntity[0];
      const dy = vecDistTarget[1] - vecDistEntity[1];
      const dz = vecDistTarget[2] - vecDistEntity[2];

      const entityNormal = new THREE.Vector3(
        vecDistEntity[0],
        vecDistEntity[1],
        vecDistEntity[2]
      ).normalize();

      this.vecDist.set(dx, dy, dz);

      const projection = entityNormal.dot(this.vecDist);

      this.jmp = projection > this.JMP_THRESHOLD;
    }
  }
}
