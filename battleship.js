class ShipMap {
  constructor() {
    this.map = {};
  }

  addCoordinate(col, row) {
    if (!this.map[col]) {
      this.map[col] = {};
    }
    this.map[col][row] = true;
  }

  isShip(col, row) {
    if (!this.map[col]) {
      return false;
    }
    if (this.map[col][row]) {
      return true;
    }
    return false;
  }
}
function validateBattlefield(field) {
//   const ships = {
//     battleShip: 1, // size 4
//     cruisers: 2, // size 3
//     destroyers: 3, // size 2
//     submarines: 4 // size 1
//   }
  const shipMap = new ShipMap();
  const ships = [];
  if (invalidPlacedShips(field)) {
    return false;
  }
  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < field[row].length; col++) {
      console.log({row, col, value: field[row][col]});
      if (field[row][col] === 1 && !shipMap.isShip(col, row)) {
        const ship = findShipAtCoordinates(field, row, col);
        ships.push(ship);
        ship.coordinates.forEach(coordinate => {
          shipMap.addCoordinate(coordinate[0], coordinate[1])
        })
      }
    }
  }
  ships.forEach(ship => console.log(ship.coordinates))
  return true;
}

function getByCoordinates(field, col, row) {
  if (col < 0 || row < 0) {
    return undefined;
  }
  if (col > 9 || row > 9) {
    return undefined;
  }
  return field[row][col];
}

function invalidPlacedShips(field) {
  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < field[row].length; col++) {
      if (field[row][col] === 1) {
        const top = getByCoordinates(field, col, row - 1);
        const bottom = getByCoordinates(field, col, row + 1);
        const left = getByCoordinates(field, col - 1, row);
        const right = getByCoordinates(field, col + 1, row);
        // If adjacent pieces are set this is invalid
        if (top === 1 && (right === 1 || left === 1)) {
          return true;
        }
        if (bottom === 1 && (left === 1 || right === 1)) {
          return true;
        }
        const topLeft = getByCoordinates(field, col - 1, row - 1);
        const topRight = getByCoordinates(field, col + 1, row - 1);
        const bottomLeft = getByCoordinates(field, col - 1, row + 1);
        const bottomRight = getByCoordinates(field, col + 1, row + 1);
        // If diagonal pieces are set this is invalid
        if (topLeft === 1 || topRight === 1 || bottomLeft === 1 || bottomRight === 1) {
          return true;
        } 
      }
    }
  }
  return false;
}

function findShipAtCoordinates(field, row, col) {
  const ship = {
      coordinates: [],
      length: 1
  };
  if (getByCoordinates(field, col + 1, row) === 0 && getByCoordinates(field, col, row + 1) === 0) {
    ship.coordinates.push([col, row]);
    return ship;
  }
  // Scan down and find all pieces of ship if applicable
  if (getByCoordinates(field, col, row + 1) === 1) {
    ship.coordinates.push([col, row]);
    ship.coordinates.push([col, row + 1]);
    ship.length++
    ship.length++
    let stillAShip = true;
    let currentRow = row + 1;
    while (stillAShip) {
      currentRow++;
      if (getByCoordinates(field, col, currentRow) === 1) {
        ship.coordinates.push([col, currentRow]);
        ship.length++;
      } else {
        stillAShip = false;
      }
    }
    return ship;
  }
  if (getByCoordinates(field, col + 1, row) === 1) {
    ship.coordinates.push([col, row]);
    ship.coordinates.push([col + 1, row]);
    ship.length++
    ship.length++
    let stillAShip = true;
    let currentCol = col + 1;
    while (stillAShip) {
      currentCol++;
      if (getByCoordinates(field, col, currentCol) === 1) {
        ship.coordinates.push([currentCol, row]);
        ship.length++;
      } else {
        stillAShip = false;
      }
    }
    return ship;
  }
  // Scan right and find all pieces of ship if applicable
}

console.log(validateBattlefield(
                [[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                 [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
                 [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
                 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                 [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                 [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]));