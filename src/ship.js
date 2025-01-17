export class ship {
  id;
  size;
  health;
  isSunk = false;
  coordinates;
  dir = 0;
  constructor(id, len, lst, dir) {
    this.size = len;
    this.health = len;
    this.id = id;
    this.setCoordinates(lst, dir);
  }
  onHit() {
    if (this.health > 1) {
      this.health--;
    } else {
      this.isSunk = true;
    }
  }
  setCoordinates(lst, dir) {
    this.coordinates = lst; //lst is an object containing x,y and dir of ship
    this.dir = dir;
  }
  changeDir() {
    if (this.dir === 0) this.dir = 1;
    else this.dir = 0;
  }
}
