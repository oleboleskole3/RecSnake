let hiscore, tilesX, tilesY, tileSize = 20;
let fruit, fruit2;
let player, player2;

function setup() {
  createCanvas(windowWidth-4, windowHeight-4);

  tilesX = floor(width/tileSize);
  tilesY = floor(height/tileSize);

  fruit = new food();
  fruit2 = new food();

  player = new body(floor(tilesX/2), 0, color(0, 255, 0));
  player.grow();
  player.grow();
  player.grow();
  player2 = new body(0, 0, color(0, 255, 200));
  player2.grow();
  player2.grow();
  player2.grow();
  strokeWeight(2);
  textAlign(CENTER, TOP);
  textSize(35);
}

function draw() {
  background(200);
  if (frameCount % 10 == 0) {
    player.update();
    player2.update();
  }
  player.show();
  player.showSelf();
  player2.show();
  player2.showSelf();
  if (player.canEat(fruit)) {
    player.grow();
    fruit = new food();
  }
  if (player2.canEat(fruit)) {
    player2.grow();
    fruit = new food();
  }
  if (player.canEat(fruit2)) {
    player.grow();
    fruit2 = new food();
  }
  if (player2.canEat(fruit2)) {
    player2.grow();
    fruit2 = new food();
  }
  fruit.show();
  fruit2.show();
  if (player.child) {
    if (player.child.death(player)) {
      player = new body(floor(tilesX/2), 0, color(0, 255, 0));
      player.grow();
      player.grow();
      player.grow();
    }
  }
  if (player2.child) {
    if (player2.child.death(player2)) {
      player2 = new body(0, 0, color(0, 255, 200));
      player2.grow();
      player2.grow();
      player2.grow();
    }
  }
  if (player.death(player2)) {
    player2 = new body(0, 0, color(0, 255, 200));
    player2.grow();
    player2.grow();
    player2.grow();
  }
  if (player2.death(player)) {
    player = new body(floor(tilesX/2), 0, color(0, 255, 0));
    player.grow();
    player.grow();
    player.grow();
  }
}

function keyPressed() {
    switch (key) {
      case 'a':
        if (player2.vel.x != 1) {
            player2.setVel(createVector(-1, 0));
        }
        break;
    case 'd':
        if (player2.vel.x != -1) {
            player2.setVel(createVector(1, 0));
        }
        break;
    case 'w':
        if (player2.vel.y != 1) {
            player2.setVel(createVector(0, -1));
        }
        break;
    case 's':
        if (player2.vel.y != -1) {
            player2.setVel(createVector(0, 1));
        }
        break;
    case 'ArrowLeft':
        if (player.vel.x != 1) {
            player.setVel(createVector(-1, 0));
        }
        break;
    case 'ArrowRight':
        if (player.vel.x != -1) {
            player.setVel(createVector(1, 0));
        }
        break;
    case 'ArrowUp':
        if (player.vel.y != 1) {
            player.setVel(createVector(0, -1));
        }
        break;
    case 'ArrowDown':
        if (player.vel.y != -1) {
            player.setVel(createVector(0, 1));
        }
        break;
    }
}

function writeHiscore(score) {
}
