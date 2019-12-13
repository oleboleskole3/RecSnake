let hiscore, tilesX, tilesY, tileSize = 20;
let fruits = [];
let players = [];
let controls = {
    Arrows: [],
    Wasd: [],
    Gamepad: {
        0: [],
        1: [],
        2: [],
        3: []
    }
};
let colors;

function setup() {
    createCanvas(windowWidth - 4, windowHeight - 4);

    tilesX = floor(width / tileSize);
    tilesY = floor(height / tileSize);

    colors = [color(118, 255, 77), color(60, 237, 250), color(240, 176, 38), color(122, 102, 255), color(255, 71, 194), color(231, 191, 255)];

    for (i = 0; i < window.params.fruit; i++) {
        fruits[i] = new food();
    }
    let regex = /^Gamepad[1-4]$/;
    let regex2 = /^Gamepad[1-4]Buttons$/;
    for (i = 0; i < 6; i++) {
        let p = window.params["p" + i];
        if (regex.test(p)) {
            players[i] = new body(floor(tilesX / 5) * i, 0, colors[i]);
            controls.Gamepad[int(p.split("pad")[1]) - 1].push([i, false])
            continue;
        }
        if (regex2.test(p)) {
            players[i] = new body(floor(tilesX / 5) * i, 0, colors[i]);
            controls.Gamepad[int(p.split("pad")[1]) - 1].push([i, true])
            continue;
        }
        if (p != "None") {
            players[i] = new body(floor(tilesX / 5) * i, 0, colors[i]);
            controls[p].push(i);
        }
    }

    for (i = 0; i < players.length; i++) {
        if (!players[i]) continue;
        players[i].grow();
        players[i].grow();
        players[i].grow();
    }

    strokeWeight(2);
    textAlign(CENTER, TOP);
    textSize(35);
}

function draw() {
    background(200);
    if (frameCount % 10 == 0) {
        for (i = 0; i < players.length; i++) {
            if (!players[i]) continue;
            players[i].update();
        }
    }
    for (i = 0; i < players.length; i++) {
        if (!players[i]) continue;
        players[i].show();
        players[i].showSelf();
        for (j = 0; j < fruits.length; j++) {
            if (players[i].canEat(fruits[j])) {
                players[i].grow();
                fruits[j] = new food();
            }
            fruits[j].show();
        }
        for (j = 0; j < players.length; j++) {
            if (i == j) continue;
            if (!players[j]) continue;
            if (players[i].child) {
                if (players[i].child.death(players[i])) {
                    players[i] = new body(floor(tilesX / 5) * i, 0, colors[i]);
                    players[i].grow();
                    players[i].grow();
                    players[i].grow();
                }
            }
            if (players[j].death(players[i])) {
                players[i] = new body(floor(tilesX / 5) * i, 0, colors[i]);
                players[i].grow();
                players[i].grow();
                players[i].grow();
            }
        }
    }
    let gamepads = navigator.getGamepads()
    for (i = 0; i < gamepads.length; i++) {
        if (!gamepads[i]) continue;
        let axes = gamepads[i].axes
        if (axes[0] < -.8) {
            controls.Gamepad[i].forEach(j => {
                if (j[1]) return;
                if (players[j[0]].vel.x != 1) {
                    players[j[0]].setVel(createVector(-1, 0));
                }
            });
        }
        if (axes[0] > .8) {
            controls.Gamepad[i].forEach(j => {
                if (j[1]) return;
                if (players[j[0]].vel.x != -1) {
                    players[j[0]].setVel(createVector(1, 0));
                }
            });
        }
        if (axes[1] < -.8) {
            controls.Gamepad[i].forEach(j => {
                if (j[1]) return;
                if (players[j[0]].vel.y != 1) {
                    players[j[0]].setVel(createVector(0, -1));
                }
            });
        }
        if (axes[1] > .8) {
            controls.Gamepad[i].forEach(j => {
                if (j[1]) return;
                if (players[j[0]].vel.y != -1) {
                    players[j[0]].setVel(createVector(0, 1));
                }
            });
        }
        let buttons = gamepads[i].buttons
        if (buttons[0].pressed) {
            controls.Gamepad[i].forEach(j => {
                if (!j[1]) return;
                if (players[j[0]].vel.y != -1) {
                    players[j[0]].setVel(createVector(0, 1));
                }
            });
        }
        if (buttons[1].pressed) {
            controls.Gamepad[i].forEach(j => {
                if (!j[1]) return;
                if (players[j[0]].vel.x != -1) {
                    players[j[0]].setVel(createVector(1, 0));
                }
            });
        }
        if (buttons[3].pressed) {
            controls.Gamepad[i].forEach(j => {
                if (!j[1]) return;
                if (players[j[0]].vel.y != 1) {
                    players[j[0]].setVel(createVector(0, -1));
                }
            });
        }
        if (buttons[2].pressed) {
            controls.Gamepad[i].forEach(j => {
                if (!j[1]) return;
                if (players[j[0]].vel.x != 1) {
                    players[j[0]].setVel(createVector(-1, 0));
                }
            });
        }
    }
}

function keyPressed() {
    switch (key) {
        case 'a':
            controls.Wasd.forEach(i => {
                if (players[i].vel.x != 1) {
                    players[i].setVel(createVector(-1, 0));
                }
            });
            break;
        case 'd':
            controls.Wasd.forEach(i => {
                if (players[i].vel.x != -1) {
                    players[i].setVel(createVector(1, 0));
                }
            });
            break;
        case 'w':
            controls.Wasd.forEach(i => {
                if (players[i].vel.y != 1) {
                    players[i].setVel(createVector(0, -1));
                }
            });
            break;
        case 's':
            controls.Wasd.forEach(i => {
                if (players[i].vel.y != -1) {
                    players[i].setVel(createVector(0, 1));
                }
            });
            break;
        case 'ArrowLeft':
            controls.Arrows.forEach(i => {
                if (players[i].vel.x != 1) {
                    players[i].setVel(createVector(-1, 0));
                }
            });
            break;
        case 'ArrowRight':
            controls.Arrows.forEach(i => {
                if (players[i].vel.x != -1) {
                    players[i].setVel(createVector(1, 0));
                }
            });
            break;
        case 'ArrowUp':
            controls.Arrows.forEach(i => {
                if (players[i].vel.y != 1) {
                    players[i].setVel(createVector(0, -1));
                }
            });
            break;
        case 'ArrowDown':
            controls.Arrows.forEach(i => {
                if (players[i].vel.y != -1) {
                    players[i].setVel(createVector(0, 1));
                }
            });
            break;
    }
}

function writeHiscore(score) {}

window.addEventListener("gamepaddisconnected", e => {
    let x = document.createElement("div")
    x.classList = "info"
    x.innerText = "Gamepad " + (e.gamepad.index + 1) + " disconnected\nId: " + e.gamepad.id
    document.body.appendChild(x)
    x.Timeout = setTimeout(function() {
        x.remove()
    }, 10000)
    let y = document.createElement("div")
    y.innerText = "X"
    y.onclick = function(){
        clearTimeout(x.Timeout)
        x.remove()
    }
    x.appendChild(y)
})