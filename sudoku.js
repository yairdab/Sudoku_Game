// define -global variables:

let shuffledArray;
let solutionGrid; // creating the sudoku whatsoever
// checking if the value the user filled in the grid is correct

function isCorrectValue(row, col, value) {
  if (value != solutionGrid[row][col]) {
    return false;
  } else {
    return true;
  }
}


//


function isColSafe(grid, col, value) {
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] == value) {
      return false;
    }
  }
  return true;
}


//
function isRowSafe(grid, row, value) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] == value) {
      return false;
    }
  }
  return true;
}


//

function isBoxSafe(grid, row, col, value) {
  let startRow = Math.floor(row / 3) * 3; //in order to start checking in a specific box
  let startCol = Math.floor(col / 3) * 3; //in order to start checking in a specific box
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (grid[i][j] == value) {
        return false;
      }
    }
  }
  return true;
}


// unifying the 3 safe functions into one

function isSafe(grid, row, col, value) {
  if (isColSafe(grid, col, value) == true && isRowSafe(grid, row, value) && isBoxSafe(grid, row, col, value) == true) {
    return true;
  }
  return false;
}

// creating randomazaion for the sudoku solution

function shuffleArray() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let currentIndex = array.length; // at first array.length = 9;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex > 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swapping

    let temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;

  }
  return array;
}

// generating the whole sudoku

function generateSudokuSolution(grid) {
  let emptyCell = findingEmptyCell(grid)
  let row = emptyCell[0];
  let col = emptyCell[1];

  // checks if there are no more empty spots
  if (row === -1) {
    return grid;
  }

  // sudoku generation as long as there are empty spots
  for (let num = 0; num < shuffledArray.length; num++) {
    if (isSafe(grid, row, col, shuffledArray[num])) {
      grid[row][col] = shuffledArray[num];
      generateSudokuSolution(grid);
    }
  }

  if (findingEmptyCell(grid)[0] !== -1)
          grid[row][col] = 0;



  return grid;
}


// starting a complete grid of only zeros, later to be filled with actual numbers
function initializeEmptyGridOfZeros() {
  let zeroGrid = [];
  for (let i = 0; i < 9; i++) { // running across all the rows
    let rowArray = [];
    for (let j = 0; j < 9; j++) { // running across all the cols
      rowArray.push(0);
    }
    zeroGrid.push(rowArray);
  }
  return zeroGrid;
}


// finding empty cells in the grid

function findingEmptyCell(grid) {

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] == 0) {
        return [i, j]; // returning the location of the empty cell
      }
    }
  }
  return [-1, -1]; // if there are no empty cells, return an impossible location
}





// copying the sudoku that was created to another grid so we could  remove Cells

function copyTheOriginalGrid(grid) {
  let newGrid = [];
  for (let i = 0; i < 9; i++) { // running across all the rows
    let rowArray = [];
    for (let j = 0; j < 9; j++) { // running across all the cols
      rowArray.push(grid[i][j]);
    }
    newGrid.push(rowArray);
  }
  return newGrid;
}

// remove cells according to desired level

function removeCells(grid, amountOfCellToRemove) {
  while (amountOfCellToRemove > 0) {
    let row = Math.floor(Math.random() * 9); // Returns a random integer from 0 to 8:
    let col = Math.floor(Math.random() * 9); // Returns a random integer from 0 to 8:
    if (grid[row][col] == 0) {
      continue;
    }
    grid[row][col] = 0;
    amountOfCellToRemove--;
  }
}


// The grid presented to user to solve

function generateGrid(level) {
  shuffledArray = shuffleArray();
  solutionGrid = generateSudokuSolution(initializeEmptyGridOfZeros());
  let amountOfCellToRemove = 0; // zeroing this value at first
  let gridForUser = copyTheOriginalGrid(solutionGrid);
  switch (level) {
    case "Easy":
      amountOfCellToRemove = 21;
      break;

    case "Medium":
      amountOfCellToRemove = 40;
      break;

    case "Hard":
      amountOfCellToRemove = 60;
      break;

  }
  removeCells(gridForUser, amountOfCellToRemove);
  return gridForUser;
}
