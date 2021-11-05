// Creating variables
Array.prototype.swapItems = function (a, b) {
  this[a] = this.splice(b, 1, this[a])[0];
  return this;
};

resolution = 100;
let myX = 0,
  myY = 0,
  updates = 0;
grid = [];
class cell {
  x = 0;
  y = 0;
  id = 0;
  neighbors = [0, 0, 0, 0];
  hasntMovedIn = 0;
  prevNeigbors;
  hasUpdated = false;
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
  }
  draw() {
    context.fillRect(this.x * 5, this.y * 5, 5, 5);
  }
  updateNeighbors() {
    this.prevNeigbors = this.neighbors;
    for (i = 0; i < grid.length; i++) {
      /*  if ((grid[i].x = this.x && grid[i].y == this.y)) {
        this.x = 300;
        this.y = 300;
      }*/
      if (grid[i].y == this.y) {
        if (grid[i].x == this.x + 1) {
          this.neighbors[0] = grid[i];
          this.neighbors[0].neighbors[1] = this;
        }
        if (grid[i].x == this.x - 1) {
          this.neighbors[1] = grid[i];
          this.neighbors[1].neighbors[0] = this;
        }
      }
      if (grid[i].x == this.x) {
        if (grid[i].y == this.y + 1) {
          this.neighbors[2] = grid[i];
          this.neighbors[2].neighbors[3] = this;
        }
        if (grid[i].y == this.y - 1) {
          this.neighbors[3] = grid[i];
          this.neighbors[3].neighbors[2] = this;
        }
      }
    }
  }
  updateSelf() {
    this.neighbors = [0, 0, 0, 0];
    this.updateNeighbors();
    if (this.hasntMovedIn < 300) {
      if (this.id == 1) {
        if (this.neighbors[2] == 0 || this.neighbors[2].id == 2) {
          this.y++;
          this.hasntMovedIn = 0;

          if (this.neighbors[2].id == 2) {
            this.neighbors[2].y--;
            this.hasntMovedIn = 0;
            return;
          }
        }
        if (this.neighbors[2].neighbors != undefined) {
          if (this.neighbors[2].neighbors[0] == 0) {
            this.y++;
            this.x++;
            this.hasntMovedIn = 0;
            return;
          } else {
            if (this.neighbors[2].neighbors[1] == 0) {
              this.y++;
              this.x--;
              this.hasntMovedIn = 0;
              return;
            }
          }
        }
        this.hasntMovedIn++;
      }
      if (this.id == 2) {
        if (this.neighbors[2] == 0) {
          this.y++;
          this.hasntMovedIn = 0;
          return;
        }
        if (this.neighbors[2].neighbors != undefined) {
          if (this.neighbors[2].neighbors[0] == 0) {
            this.y++;
            this.x++;
            this.hasntMovedIn = 0;

            return;
          } else {
            if (this.neighbors[2].neighbors[1] == 0) {
              this.y++;
              this.x--;
              this.hasntMovedIn = 0;

              return;
            } else {
              if (this.id == 2) {
                if (this.neighbors[0] == 0) {
                  this.x++;
                  this.hasntMovedIn = 0;

                  return;
                } else if (this.neighbors[1] == 0) {
                  this.x--;
                  this.hasntMovedIn = 0;

                  return;
                }
              }
            }
          }
        }
      }
    }
    if (this.hasntMovedIn < 800) {
      this.hasntMovedIn++;
    } else {
      this.hasntMovedIn = 0;
    }
  }
}

for (i = 1; i < 255; i++) {
  grid.push(new cell(i, 100, 0));
  grid.push(new cell(100, i, 0));
  grid.push(new cell(1, i, 0));
}

function update() {
  updates++;
  // Napisanoto tuk se izpulnqva otnovo i otnovo mnogo puti v sekunda
  for (let i = 0; i < grid.length; i++) {
    // grid[i].updateNeighbors();
    grid[i].updateSelf();
  }
  if (updates % 1000 == 0) {
    updateAll();
  }
  if (isKeyPressed[49]) {
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 2; j++) {
        grid.push(
          new cell(Math.floor(mouseX / 5) + i, Math.floor(mouseY / 5) + j, 1)
        );
      }
    }
  }
  if (isKeyPressed[50]) {
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 2; j++) {
        grid.push(
          new cell(Math.floor(mouseX / 5) + i, Math.floor(mouseY / 5) + j, 2)
        );
      }
    }
  }
}

function draw() {
  // tuk naprogramirai kakvo da se risuva
  /* for (i = 1; i < 255; i++) {
    for (j = 1; j < 255; j++) {
      context.strokeRect(i * 5, j * 5, 5, 5);
    }
  }*/
  for (i = 0; i < grid.length; i++) {
    context.fillStyle = "black";
    if (grid[i].id == 1) {
      if (grid[i].hasntMovedIn < 300) {
        context.fillStyle = "yellow";
      } else {
        context.fillStyle = "red";
      }
    }
    if (grid[i].id == 2) {
      if (grid[i].hasntMovedIn < 300) {
        context.fillStyle = "blue";
      } else {
        context.fillStyle = "dark blue";
      }
    }
    grid[i].draw();
  }
}

/*function rearrangeGrid() {
  newgrid = [];
  for (i = 1; i < 15; i++) {
    newgrid[i] = [];
    for (j = 1; j < 15; j++) {
      newgrid[grid[i][j].x][grid[i][j].y] = grid[i][j];
    }
  }
  grid = newgrid;
}*/

//setInterval(updateAll, 5000);
function keydown(key) {
  // Show the pressed keycode in the console
  console.log("Pressed", key);
}

function mouseup() {
  // Show coordinates of mouse on click
  console.log("Mouse clicked at", mouseX, mouseY);
}
