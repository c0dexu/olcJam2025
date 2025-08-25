export class PlayerController {
  target = null;
  ref;
  keys = {};
  meshId;
  entity;

  constructor(ref) {
    this.ref = ref;
  }

  updateKeys = (ev) => {
    const k = ev.code;
    ev.preventDefault();
    this.keys[k] = ev.type === "keydown";
  };

  setEntity = (et) => {
    this.entity = et;
  };

  updateReaction = () => {
    let vert = this.keys.ArrowUp ? 1 : this.keys.ArrowDown ? -1 : 0;
    let hor = this.keys.ArrowLeft ? 1 : this.keys.ArrowRight ? -1 : 0;
    let jmp = this.keys.KeyX ? 1 : 0;

    if (this.entity) {
      this.entity.hor = hor;
      this.entity.vert = vert;
      this.entity.jmp = jmp;
    }
  };

  listen = () => {
    this.ref.addEventListener("keydown", this.updateKeys);
    this.ref.addEventListener("keyup", this.updateKeys);
  };
}
