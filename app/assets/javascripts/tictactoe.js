// Code your JavaScript / jQuery solution here

var turn = 0
let board
let saveButton
let clearButton
let previousButton

function player() {
// based on turn variable, set the player Icon X or O
  if (turn % 2 == 0 ){
    return "X"
  } else {
    return "O"
  }
}

function clearBoard() {
  for (let i = 0; i <9 ; i++) {
    board[i].innerHTML = ""
  }
  turn = 0
}

function setMessage(message) {
  $("div#message").text(message)
}

function updateState(square) {
  square.innerHTML = player()
}

function checkWinner() {
  if (checkHalf("X")) {
    setMessage("Player X Won!")
    return true
  } else if (checkHalf("O")) {
    setMessage("Player O Won!")
    return true
  } else {
    return false
  }
}

function checkHalf(token) {
  let vertical = ($('*[data-x="0"]').toArray().every((val, i, arr) => val.innerHTML === token)||
  $('*[data-x="1"]').toArray().every((val, i, arr) => val.innerHTML === token)||
  $('*[data-x="2"]').toArray().every((val, i, arr) => val.innerHTML === token))

  let horizontal = ($('*[data-y="0"]').toArray().every((val, i, arr) => val.innerHTML === token)||
  $('*[data-y="1"]').toArray().every((val, i, arr) => val.innerHTML === token)||
  $('*[data-y="2"]').toArray().every((val, i, arr) => val.innerHTML === token))

  let diagonal = ([board[0], board[4], board[8]].every((val, i, arr) => val.innerHTML === token)||
  [board[2], board[4], board[6]].every((val, i, arr) => val.innerHTML === token))

  return (vertical || horizontal ||diagonal)
}

function doTurn(element) {
  updateState(element)
  turn ++

  if(checkWinner()) {
    clearBoard()
  }

  if (turn ==9) {
    setMessage("Tie game.")
  }
}

$(document).ready(function initialize(){
  board = $("td")
  saveButton = $("button#save")
  previousButton = $("button#previous")
  clearButton = $("button#clear")

})
// data boxes on click do turn
$(document).ready(function attachListeners(){

})
