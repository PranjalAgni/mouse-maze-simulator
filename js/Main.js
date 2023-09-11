const API = require('./API');

let x = 0;
let y = 0;
let direction = 'N';
const directionsList = ['N', 'E', 'S', 'W'];

function log(text) {
  console.error(text);
}

const visitedMap = new Map();

function decideAction() {
  const isWallRight = API.wallRight();
  const isWallLeft = API.wallLeft();
  const isWallFront = API.wallFront();
  let key = `${x}-${y}`;
  while (visitedMap.has(key)) {
    if (!isWallRight) {
    } else if (!isWallLeft) {
    }
    return;
  }

  log(`I am at ${x},${y}`);
  visitedMap.set(key, true);
  if (!isWallRight) {
    const nextDirIndex =
      directionsList.findIndex((dir) => dir === direction) + 1;
    direction = directionsList[nextDirIndex % 4];
    API.turnRight();
  } else if (!isWallLeft) {
    let nextDirIndex = directionsList.findIndex((dir) => dir === direction) - 1;
    nextDirIndex = nextDirIndex < 0 ? 3 : nextDirIndex;
    direction = directionsList[nextDirIndex % 4];
    API.turnLeft();
  } else if (isWallFront) {
    while (API.wallFront()) {
      const nextDirIndex =
        directionsList.findIndex((dir) => dir === direction) + 1;
      direction = directionsList[nextDirIndex % 4];
      API.turnRight();
    }
  }
}

function act() {}

function main() {
  log('Running...');
  API.setColor(0, 0, 'G');
  API.setText(0, 0, 'abc');
  while (true) {
    log(`Direction: x = ${x} y = ${y}`);
    // API.setColor(x, y, 'G');
    // decideAction();
    if (!API.wallRight()) {
      API.turnRight();
    }
    while (API.wallFront()) {
      API.turnLeft();
    }
    API.moveForward();
    if (direction === 'N') {
      y += 1;
    } else if (direction === 'S') {
      y -= 1;
    } else if (direction === 'W') {
      x -= 1;
    } else if (direction === 'E') {
      x += 1;
    }
  }
}

main();

/**
 * 
 * 
 * function decideAction() {
  const isWallRight = API.wallRight();
  const isWallLeft = API.wallLeft();
  const isWallFront = API.wallFront();

  const key = `${x}-${y}`;
  log(`I am at ${x},${y}`);
  if (visitedMap.has(key)) {
    const movesAvailable = visitedMap.get(key).split();
    movesAvailable.shift();
    if (movesAvailable.length) {
      visitedMap.set(key, movesAvailable.join());
    }

    log('Ohhh wow this is already visited....');
  } else {
    let movesPossible = '';
    if (!isWallRight) movesPossible += 'R';
    if (!isWallLeft) movesPossible += 'L';
    if (!isWallFront) movesPossible += 'F';

    // set key on the map
    visitedMap.set(key, movesPossible);
  }

  const whatMovesArePossible = visitedMap.get(key);
  if (!whatMovesArePossible.length) {
    while (API.wallFront()) {
      API.turnRight();
      const nextDirIndex =
        directionsList.findIndex((dir) => dir === direction) + 1;
      direction = directionsList[nextDirIndex % 4];
    }
    // throw new Error('No moves possible and its stuck');
  }
  const move = whatMovesArePossible[0];
  if (move === 'R') {
    API.turnRight();
    const nextDirIndex =
      directionsList.findIndex((dir) => dir === direction) + 1;
    direction = directionsList[nextDirIndex % 4];
  } else if (move === 'L') {
    let nextDirIndex = directionsList.findIndex((dir) => dir === direction) - 1;
    nextDirIndex = nextDirIndex < 0 ? 3 : nextDirIndex;
    direction = directionsList[nextDirIndex % 4];
    API.turnLeft();
  } else if (isWallFront) {
    // now we need to turn around as no way to move further
    while (API.wallFront()) {
      API.turnRight();
      const nextDirIndex =
        directionsList.findIndex((dir) => dir === direction) + 1;
      direction = directionsList[nextDirIndex % 4];
    }
  }
}
 */
