class body {
    constructor(x_, y_, col_) {
      this.pos = createVector(x_, y_);
      this.col = col_;
      this.vel = createVector(0, 1);
    }
  
    update() {
      this.pos.add(this.vel);
      if (this.child) {
        this.child.update();
        this.child.setVel(this.vel);
      }
      this.pos.set(this.pos.x > -1? this.pos.x % tilesX : tilesX + this.pos.x + 1, this.pos.y > -1? this.pos.y % tilesY : tilesY + this.pos.y + 1);
    }
    updateSelf() {
        this.pos.add(this.vel);
    }
  
    show() {
      fill(this.col);
      rect(this.pos.x*tileSize, this.pos.y*tileSize, tileSize, tileSize);
      if (this.child) {
        this.child.show();
      }
    }
    
    showSelf() {
      fill(this.col);
      rect(this.pos.x*tileSize, this.pos.y*tileSize, tileSize, tileSize);
    }
  
    setVel(vel_) {
      this.vel = vel_;
    }
  
    grow() {
      if (!this.child) {
        this.child = new body(floor(this.pos.x), floor(this.pos.y), color(0, 100, 100));
        this.child.setVel(this.vel);
        this.updateSelf();
      } else {
        this.updateSelf();
        this.child.grow();
        this.child.setVel(this.vel);
      }
    }
    
    len() {
      if (this.child) {
        return this.child.len() + 1;
      } else {
        return 1;
      }
    }
    
    death(head) {
      if (dist(this.pos.x, this.pos.y, head.pos.x, head.pos.y) < 1) {
        return true;
      } else {
        return this.child == null? false : this.child.death(head);
      }
    }
    
    canEat(food) {
      return dist(this.pos.x, this.pos.y, food.pos.x, food.pos.y) < 1;
    }
  }