const API = require('./API');
const ORIENTATION_LIST = ['N', 'E', 'S', 'W'];

function log(text) {
  console.error(text);
}

function getNewOrientation(currOrientation, numMoves) {
  const currIdx = ORIENTATION_LIST.findIndex((dir) => dir === currOrientation);
  let newIdx = currIdx + numMoves;
  return ORIENTATION_LIST[newIdx % 4];
}

function rotateRobot(row, col, orientation) {
  if (orientation === 'N') {
    return [row - 1, col, row + 1, col, row, col + 1];
  } else if (orientation === 'S') {
    return [row + 1, col, row - 1, col, row, col - 1];
  } else if (orientation === 'W') {
    return [row, col - 1, row, col + 1, row - 1, col];
  } else if (orientation === 'E') {
    return [row, col + 1, row, col - 1, row + 1, col];
  }
}

/**
 *
 * @param {number} row
 * @param {number} col
 * @param {string} orientation
 * @typedef {[number, number, string, string]} MazeCoordinatesTuple
 * @returns {Array<MazeCoordinatesTuple>}
 */
function findValidNeighbours(row, col, orientation) {
  console.error('findValidNeighbours() orientation is: ', orientation);
  let neighbours = [];
  const leftRightPos = rotateRobot(row, col, orientation);
  if (!API.wallLeft()) {
    neighbours.push([
      leftRightPos[0],
      leftRightPos[1],
      getNewOrientation(orientation, 3),
      'L',
    ]);
  }

  if (!API.wallRight()) {
    neighbours.push([
      leftRightPos[2],
      leftRightPos[3],
      getNewOrientation(orientation, 1),
      'R',
    ]);
  }

  if (!API.wallFront()) {
    neighbours.push([leftRightPos[4], leftRightPos[5], orientation, 'F']);
  }

  return neighbours;
}

function getKey(row, col) {
  return `${row}-${col}`;
}

/**
 *
 * @param {"F" | "L" | "R"} direction
 */
function moveRobot(direction) {
  if (direction === 'L') {
    API.turnLeft();
  } else if (direction === 'R') {
    API.turnRight();
  }

  while (API.wallFront()) {
    API.turnRight();
  }
  API.moveForward();
}

function getOppositeOrientation(orientation) {
  if (orientation === 'N') return 'S';
  else if (orientation === 'S') return 'N';
  else if (orientation === 'W') return 'E';
  else if (orientation === 'E') return 'W';
}

function backTrackRobot() {
  API.turnRight();
  API.turnRight();
  API.moveForward();
}

function exploreMaze2(row, col) {
  const visitedMap = new Map();
  const stack = [];
  let orientation = 'N';
  stack.push([row, col]);
  while (stack.length) {
    const [currRow, currCol] = stack.at(0);
    console.error('Current stack is: ', stack);
    const key = getKey(currRow, currCol);
    API.setText(currRow, currCol, `${currRow},${currCol}`);
    visitedMap.set(key, true);
    const neighboursList = findValidNeighbours(currRow, currCol, orientation);
    let isAnyNeighbourFound = false;
    for (const neighbour of neighboursList) {
      const neighbourKey = getKey(neighbour[0], neighbour[1]);
      if (!visitedMap.has(neighbourKey)) {
        stack.unshift([neighbour[0], neighbour[1], neighbour[2]]);
        moveRobot(neighbour[3]);
        orientation = neighbour[2];
        isAnyNeighbourFound = true;
        break;
      } else {
        console.error('Already visited this neighbour: ', neighbourKey);
      }
    }

    if (!isAnyNeighbourFound) {
      // const targetIdx = ORIENTATION_LIST.findIndex(dir => )
      // safe place to pop the current top of the stack as no neighbours are found
      // here we need to move our robot to go back to the second top if it exists

      console.error('Currently at: ', key);
      stack.shift();
      if (stack.length) {
        const [tr, tc] = stack.at(0);
        console.error('Need to reach at: ', `${tr}-${tc}`);
        backTrackRobot();
        orientation = getOppositeOrientation(orientation);
      }
    }
  }
}

function exploreMaze(row, col) {
  const visitedMap = new Map();
  const stack = [];
  let orientation = 'N';
  stack.push([row, col, orientation]);
  while (stack.length) {
    const [currRow, currCol, currOrientation] = stack.at(0);
    console.error('Current stack is: ', stack);
    const key = getKey(currRow, currCol);
    API.setText(currRow, currCol, `${currRow},${currCol}`);
    visitedMap.set(key, true);
    const neighboursList = findValidNeighbours(
      currRow,
      currCol,
      currOrientation
    );
    let isAnyNeighbourFound = false;
    for (const neighbour of neighboursList) {
      const neighbourKey = getKey(neighbour[0], neighbour[1]);
      if (!visitedMap.has(neighbourKey)) {
        stack.unshift([neighbour[0], neighbour[1], neighbour[2]]);
        moveRobot(neighbour[3]);
        isAnyNeighbourFound = true;
        break;
      } else {
        console.error('Already visited this neighbour: ', neighbourKey);
      }
    }

    if (!isAnyNeighbourFound) {
      // const targetIdx = ORIENTATION_LIST.findIndex(dir => )
      // safe place to pop the current top of the stack as no neighbours are found
      // here we need to move our robot to go back to the second top if it exists

      console.error('Currently at: ', key);
      if (stack.length >= 2) {
        const [cr, cc, co] = stack.at(1);
        console.error('Need to reach at: ', `${cr}-${cc}`);
        backTrackRobot(currRow, currCol, currOrientation, cr, cc, co);
      }
    }
  }
}

function main() {
  log('Running...');
  API.setColor(0, 0, 'G');

  let row = 0;
  let col = 0;
  exploreMaze2(row, col);
}

main();
