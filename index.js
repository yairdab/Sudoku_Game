// create variables:

var selectedNum;
var selectedTile;
var rowTile;
var colTile;

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;
// Run startgame function when start button is clicked
window.onload = function() {
  // Run startGame function when button is clicked:
  document.getElementById("start-button").addEventListener("click", startGame);
  // Add EventListener to each number in #number-container:
  for (let i = 0; i < document.getElementById("number-container").children.length; i++) {
    document.getElementById("number-container").children[i].addEventListener("click", function() {
      // if number is already selected:
      if (this.classList.contains("selected")) {
        // Then remove selection:
        this.classList.remove("selected");
        selectedNum = null;
      } else {
        // Deselect all other numbers
        for (let i = 0; i < 9; i++) {
          document.getElementById("number-container").children[i].classList.remove("selected")
        }
        // select it and update selectedNum variable
        this.classList.add("selected");
        selectedNum = this;
        updateMove(rowTile, colTile);
      }

    });
  }
}

function startGame() {
  // Choose board difficulty:
  let level;
  if (document.getElementById("Easy").checked) {
    level = "Easy";
  } else if (document.getElementById("Medium").checked) {
    level = "Medium";
  } else {
    level = "Hard";
  }

  let grid = generateGrid(level);
  generateOurBoard(grid); // "grid" = "board"

  min, sec, hr = 0;
  resetTimer();
  startTimer();
  // clearBoard();
}

function changeTheme() {
  // Set theme based on input
  if (document.getElementById("Light").checked) {
    document.querySelector("body").classList.remove("dark");
  } else {
    document.querySelector("body").classList.add("dark");
  }
}




function generateOurBoard(board) {
  //clear previous board
  clearPrevious();
  // Let used to increment tiles ids
  let idCount = 0;
  // create 81 tiles
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // create a new paragraph elements
      let tile = document.createElement("p");
      // if the tile is not suppose to be blank - has a number
      if (board[i][j] > 0) {
        tile.textContent = board[i][j];
      } else {
        // if the tile is suppose to be blank
        tile.addEventListener("click", function() {
          //if the tile is already selected
          if (tile.classList.contains("selected")) {
            // Then remove selection:
            tile.classList.remove("selected");
            selectedTile = null;
          } else {
            // Deselect all other tiles
            for (let index = 0; index < 81; index++)
              document.querySelectorAll(".tile")[index].classList.remove("selected");

            // add selection and update variable:
            tile.classList.add("selected");
            selectedTile = this;
            rowTile = i;
            colTile = j;
            updateMove(rowTile, colTile);
          }

        });

      }
      // Assign tile id
      tile.id = idCount;
      // increment for the next tile
      idCount++;
      // Add .tile class to all tiles
      tile.classList.add("tile");
      // Add sukoku borders
      if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)) {
        tile.classList.add("bottomBorder");
      }
      if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
        tile.classList.add("rightBorder");
      }
      // Add tile to board
      document.getElementById("board").appendChild(tile);
    }
  }
}

function updateMove(i, j) {
  // if a tile and a number are selected (aren't "null")
  if (selectedTile && selectedNum) {
    // set the tile to the correct number
    selectedTile.textContent = selectedNum.textContent;
    //  if the number matches the corresponding number in the solution grid
    if (!checkCorrect(selectedTile, i, j)) {
      selectedTile.classList.add("wrong");
    } else {
      selectedTile.classList.remove("wrong");
      if (isGameOver()) {
        document.getElementById("goodLuck").textContent = "You won!!";
        stopTimer();
        alert(`You made it in ${document.getElementById("timer").innerHTML}!`)
      }
    }
    selectedNum.classList.remove("selected");
    selectedTile.classList.remove("selected");
    selectedNum = null;
    selectedTile = null;
  }
}

function isGameOver() {
  let tiles = document.querySelectorAll(".tile");
  let index = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (solutionGrid[i][j] != parseInt(tiles[index].textContent)) {
        return false;
      }
      index++;
    }
  }
  return true;
}



function checkCorrect(tile, i, j) {
  let value = tile.textContent;
  let valueNum = parseInt(value);
  if (solutionGrid[i][j] == valueNum) {
    return true;
  } else {
    return false;
  }
}

// helper functions

function clearPrevious() {
  // Access all of the tiles
  let tiles = document.querySelectorAll(".tile")
  // remove each tile
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].remove();
  }
  // Deselect any numbers
  for (let i = 0; i < document.getElementById("number-container").children.length; i++) {
    document.getElementById("number-container").children[i].classList.remove("selected");
  }
  // clear selected variables
  selectedTile = null;
  selectedNum = null;
}

function loginUser() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username == "abcd" && password == "1234") {
    window.location.href = 'https://google.com';
  }
}


function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}

function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
  const timer = document.getElementById('timer');

  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
  const timer = document.getElementById('timer');
  sec = 0;
  min = 0;
  hr = 0;
  timer.innerHTML = '00:00:00';
}
