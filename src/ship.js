export class ship {
  id;
  size;
  health;
  isSunk = false;
  coordinates;
  constructor(len) {
    this.size = len;
    this.health = len;
    this.id = len;
  }
  onHit() {
    if (this.health > 1) {
      this.health--;
    } else {
      this.isSunk = true;
    }
  }
  setCoordinates(lst) {
    this.coordinates = lst;
  }
}
