export class PlayerController {
  target = null;
  ref;
  keys = {};
  meshId;

  constructor(ref) {
    this.ref = ref;
  }

  setTarget(target) {
    this.target = target;
    this.meshId = this.target.mesh.uuid;
  }

  updateKeys = (ev) => {
    const k = ev.code;
    ev.preventDefault();
    this.keys[k] = ev.type === "keydown";
  };

  listen() {
    this.ref.addEventListener("keydown", this.updateKeys);
    this.ref.addEventListener("keyup", this.updateKeys);
  }
}
