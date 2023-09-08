const API = require('./API');

function log(text) {
  console.error(text);
}

function exploreMaze(row, col) {}

function main() {
  log('Running...');
  API.setColor(0, 0, 'G');
  API.setText(0, 0, 'abc');
  let row = 0;
  let col = 0;

  while (true) {
    if (!API.wallRight()) {
      API.turnRight();
    }
    while (API.wallFront()) {
      API.turnLeft();
    }
    API.moveForward();
  }
}

main();
