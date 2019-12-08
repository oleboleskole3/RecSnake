class food {
    constructor(x_, y_) {
      if (x_ && y_) {
        this.pos = createVector(x_, y_);
      } else {
        let x = floor(random(0, tilesX));
        let y = floor(random(0, tilesY));
        this.pos = createVector(x, y);
      }
    }
    show() {
      fill(255, 0, 0);
      rect(this.pos.x * tileSize, this.pos.y * tileSize, tileSize, tileSize);
    }
  }