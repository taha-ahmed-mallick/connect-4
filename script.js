const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
let canvas_percent, boardH = 0, boardW = 0;

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
let boardBack = new Image();
boardBack.src = "./board-back.png"
let disc = new Image();
disc.src = "./disc.jpg";

window.addEventListener('resize', update);
board.addEventListener('load', drawImage);
boardBack.addEventListener('load', drawImage);
update();

function drawImage() {
      if (canvas.width > canvas.height && boardW < canvas.width) {
            let aspectBoard = board.naturalWidth / board.naturalHeight;
            boardH = 650;
            boardW = boardH * aspectBoard;
            ctx.drawImage(boardBack, 32 * boardH / 650, 4 * boardW / 780, boardW * (boardBack.naturalWidth / board.naturalWidth), boardH * (boardBack.naturalHeight / board.naturalHeight));
            ctx.drawImage(board, 0, 0, boardW, boardH);
            console.log("if");
      } else {
            let aspectBoard = board.naturalWidth / board.naturalHeight;
            boardW = canvas.width;
            boardH = boardW / aspectBoard;
            ctx.drawImage(boardBack, 32 * boardH / 650, 4 * boardW / 780, boardW * (boardBack.naturalWidth / board.naturalWidth), boardH * (boardBack.naturalHeight / board.naturalHeight));
            ctx.drawImage(board, 0, 0, boardW, boardH);
            console.log("else");
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