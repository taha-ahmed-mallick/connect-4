const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
let canvas_percent, boardH = 0, boardW = 0, d = 78, nMargin = 12.5, r = 0;
let turn = 'red';

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
disc.addEventListener('load', drawImage);
update();

function drawImage() {
      if (canvas.width > canvas.height && boardW < canvas.width) {
            let aspectBoard = board.naturalWidth / board.naturalHeight;
            boardH = canvas.height - 90;
            boardW = boardH * aspectBoard;
            d = boardH / board.naturalHeight * 78;
            nMargin = boardH * 12.5 / 591;
            ctx.drawImage(boardBack, canvas.width / 2 - boardW / 2 + 32 * boardH / 650, 4 * boardW / 780 + 90, boardW * (boardBack.naturalWidth / board.naturalWidth), boardH * (boardBack.naturalHeight / board.naturalHeight));
            if (turn == "red") {
                  ctx.drawImage(disc, 78, 0, 78, 78, (canvas.width / 2 - d / 2) - (d + nMargin) * r, 121, d, d);
            } else if (turn == "yellow") {
                  ctx.drawImage(disc, 0, 0, 78, 78, canvas.width / 2 - d / 2, 10, d, d);
            }
            ctx.drawImage(board, canvas.width / 2 - boardW / 2, 90, boardW, boardH);
            console.log("if");
      } else {
            let aspectBoard = board.naturalWidth / board.naturalHeight;
            boardW = canvas.width;
            boardH = boardW / aspectBoard;
            d = boardH * 78 / board.naturalHeight;
            ctx.drawImage(boardBack, canvas.width / 2 - boardW / 2 + 32 * boardH / 650, 4 * boardW / 780 + 90, boardW * (boardBack.naturalWidth / board.naturalWidth), boardH * (boardBack.naturalHeight / board.naturalHeight));
            if (turn == "red") {
                  ctx.drawImage(disc, 78, 0, 78, 78, 0, 0, d, d);
            } else if (turn == "yellow") {
                  ctx.drawImage(disc, 0, 0, 78, 78, 0, 0, d, d);
            }
            ctx.drawImage(board, canvas.width / 2 - boardW / 2, 90, boardW, boardH);
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

function draw(grid, turn) {
      console.log(grid[0][0].obj);
}

class Board {
      constructor() {
            this.holes = [];
      }

      setup() {
            for (let i = 0; i < 6; i++) {
                  let row = [];
                  for (let i = 0; i < 7; i++) {
                        row.push(new Hole(1, 1, d / 2));
                  }
                  this.holes.push(row);
            }
      }

      logic() { }
}

class Hole {
      constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.obj = null;
      }
}

window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
            case 65:
                  console.log("A");
                  r++;
                  ctx.clearRect(0, 0, canvas.width, canvas.height)
                  drawImage();
                  break;
            case 83:
                  console.log("S");
                  break;
            case 68:
                  console.log("D");
                  r--;
                  ctx.clearRect(0, 0, canvas.width, canvas.height)
                  drawImage();
                  break;
            case 37:
                  console.log("⬅");
                  break;
            case 40:
                  console.log("⬇");
                  break;
            case 39:
                  console.log("➡");
            default:
                  break;
      }
});

let newBoard = new Board();
newBoard.setup();