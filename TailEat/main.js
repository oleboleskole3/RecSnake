let hiscore, tilesX, tilesY, tileSize = 20;
let fruit;
let player;
let localStorage = window.localStorage;

function setup() {
  createCanvas(windowWidth-4, windowHeight-4);
  if (localStorage.getItem("hiscore")) {
    hiscore = int(localStorage.getItem("hiscore"));
  } else {
    hiscore = 0;
  }

  tilesX = floor(width/tileSize);
  tilesY = floor(height/tileSize);

  fruit = new food();

  player = new body(floor(tilesX/2), 0, color(0, 255, 0));
  player.grow();
  player.grow();
  player.grow();
  strokeWeight(2);
  textAlign(CENTER, TOP);
  textSize(35);
}

function draw() {
  background(200);
  if (frameCount % 10 == 0) {
    player.update();
  }
  player.show();
  player.showSelf();
  if (player.canEat(fruit)) {
    player.grow();
    fruit = new food();
  }
  fruit.show();
  if (player.child) {
    if (player.child.death(player)) {
      noLoop();
      background(255, 120, 99);
      player.show();
      tint(255, 255, 255, 180);
      player.showSelf();
      tint(255, 255, 255, 255);
      fill(0);
      text("You are dead!\nPress «SPACE» to restart\nYour length was " + player.len() + " tiles\nHiscore is " + hiscore + "\n" + (player.len() > hiscore? "New hiscore!!" : ""), width/2, 10);
      hiscore = player.len() > hiscore? player.len() : hiscore;
      writeHiscore(hiscore);
    }
  }
}

function keyPressed() {
    switch (key) {
    case ' ':
        player = new body(floor(tilesX/2), 0, color(0, 255, 0));
        player.grow();
        player.grow();
        player.grow();
        loop();
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
    localStorage.setItem("hiscore", score);
}
