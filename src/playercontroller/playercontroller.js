export class PlayerController {
  target = null;
  ref;
  keys = {};
  meshId;
  entity;
  camera;

  constructor(ref) {
    this.ref = ref;
  }

  updateKeys = (ev) => {
    const k = ev.code;
    ev.preventDefault();
    this.keys[k] = ev.type === "keydown";

    if (this.keys.KeyR) {
      this.entity.respawn();
    }
  };

  setEntity = (et) => {
    this.entity = et;
  };

  setCamera = (cam) => {
    this.camera = cam;
  };

  updateReaction = () => {
    let vert = this.keys.ArrowUp ? 1 : this.keys.ArrowDown ? -1 : 0;
    let hor = this.keys.ArrowLeft ? 1 : this.keys.ArrowRight ? -1 : 0;
    let jmp = this.keys.KeyX ? 1 : 0;
    let superjmp = this.keys.KeyZ ? 1 : 0;

    let rotA = this.keys.KeyW ? 1 : this.keys.KeyS ? -1 : 0;
    let rotB = this.keys.KeyA ? 1 : this.keys.KeyD ? -1 : 0;

    let zoomReact = this.keys.KeyE ? 1 : this.keys.KeyQ ? -1 : 0;

    if (this.entity) {
      this.entity.hor = hor;
      this.entity.vert = vert;
      this.entity.jmp = jmp;
      this.entity.superjmp = superjmp;
    }

    if (this.camera) {
      this.camera.rotA = rotA;
      this.camera.rotB = rotB;
      this.camera.zoomReact = zoomReact;
    }
  };

  listen = () => {
    this.ref.addEventListener("keydown", this.updateKeys);
    this.ref.addEventListener("keyup", this.updateKeys);
  };
}
