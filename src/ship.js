class ship {
  size;
  health;
  isSunk = false;
  constructor(len) {
    this.size = len;
    this.health = len;
  }
  onHit() {
    if (this.health > 1) {
      this.health--;
    } else {
      this.isSunk = true;
    }
  }
}
