export class ship {
  id;
  size;
  health;
  isSunk = false;
  coordinates;
  constructor(len, x, y, dir) {
    this.size = len;
    this.health = len;
    this.id = len;
    this.setCoordinates(x, y, dir);
  }
  onHit() {
    if (this.health > 1) {
      this.health--;
    } else {
      this.isSunk = true;
    }
  }
  setCoordinates(lst) {
    this.coordinates = lst; //lst is an object containing x,y and dir of ship
  }
}
