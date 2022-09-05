const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
let canvas_percent;

const inputs = document.getElementsByTagName('input');

for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('focusout', () => {
            if (inputs[i].value == '') {
                  inputs[i].value = `PLAYER ${i + 1}`;
            }

            if (i == 0) {
                  if (inputs[i].value == inputs[i + 1].value) {
                        inputs[i].value = `PLAYER ${i + 1}`;
                  }
            } else {
                  if (inputs[i].value == inputs[i - 1].value) {
                        inputs[i].value = `PLAYER ${i + 1}`;
                  }
            }
      });
}

let board = new Image();
board.src = "./board.jpg";
let disc = new Image();
disc.src = "./disc.jpg";

window.addEventListener('resize', update);
board.addEventListener('load', drawImage)
update();

function drawImage() {
      if (canvas.width > canvas.height) {
            let aspect = board.naturalWidth / board.naturalHeight;
            let h = canvas.height;
            let w = h / aspect;
            ctx.drawImage(board, 0, 0, h, w);
      } else {
            let aspect = board.naturalWidth / board.naturalHeight;
            let w = canvas.width;
            let h = w / aspect;
            ctx.drawImage(board, 0, 0, w, h);
      }
}

function update() {
      canvas_percent = {
            width: 0.01 * window.innerWidth,
            height: 0.01 * window.innerHeight
      }
      canvas.width = window.innerWidth;
      canvas.height = canvas_percent.height * 90;
      drawImage();
}

class Board {
      constructor() {
            this.holes = [];
      }

      setup() {
            console.log(canvas_percent.width * 50);
      }
}

class Hole {
      constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.obj = null;
      }
}

let newBoard = new Board();
newBoard.setup();