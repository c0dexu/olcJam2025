export class GameState {
  ref;
  state = {
    isAppRunning: false,
    isControllersDialogOpen: false,
  };
  events = new Map();

  constructor(ref) {
    this.ref = ref;
    console.log("REF", this.ref);
  }

  addEvent(type, payload) {
    const event = new CustomEvent(type, { detail: payload });
    this.ref.addEventListener(type, (e) => {
      const p = e.detail;
      const temp = { ...this.state };
      this.state = { ...temp, ...p };
      console.log("STATE", this.state);
    });
    this.events.set(type, event);
  }

  dispatchEvent(type) {
    const e = this.events.get(type);
    if (!e) return;
    if (!this.ref) return;
    this.ref.dispatchEvent(e);
  }

  getState() {
    return this.state;
  }
}
