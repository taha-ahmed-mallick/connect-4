const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
let canvas_percent;

window.addEventListener('resize', update);
update();

function update() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      canvas_percent = {
            width: 0.01 * canvas.width,
            height: 0.01 * canvas.height
      }
}

const inputs = document.getElementsByTagName('input');

for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('focusout', () => {
            if (inputs[i].value == '') {
                  inputs[i].value = `PLAYER ${i + 1}`;
            }
      });
}

let grdL = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grdL.addColorStop(0, "#2F80ED");
grdL.addColorStop(1, "#56CCF2");

class Board {
      constructor() {
            this.holes = [];
      }

      setup() {
            this.drawBoard();

            for (let i = 0; i < 6; i++) {
                  let row = [];
                  for (let j = 0; j < 7; j++) {
                        row.push(new Hole(canvas_percent.width * 94 / 7 * j + canvas_percent.width * 9.5, canvas_percent.height * 74 / 6 * i + canvas_percent.height * 29, 45));
                        row[j].drawHoles();
                  }
                  this.holes.push(row);
            }
      }

      drawBoard() {
            ctx.beginPath();
            ctx.roundRect(canvas_percent.width * 3, canvas_percent.height * 23, canvas_percent.width * 94, canvas_percent.height * 74, 10);
            ctx.fillStyle = "#1d61f0";
            ctx.fill();
      }
}

class Hole {
      constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.obj = null;
      }

      drawHoles() {
            let grdR = ctx.createRadialGradient(this.x, this.y, 30, this.x, this.y, this.r + 5);
            grdR.addColorStop(0, "#00000000");
            grdR.addColorStop(1, "#000000");

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 6.28);
            ctx.fillStyle = grdL;
            ctx.fill();
            ctx.arc(this.x, this.y, this.r, 0, 6.28);
            ctx.fillStyle = grdR;
            ctx.fill();
      }
}

let newBoard = new Board();
newBoard.setup();