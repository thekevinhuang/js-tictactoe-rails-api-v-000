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

function boardFillCount() {
  let totalSpace = 9
  for (let i= 0; i<9; i++) {
    if(board[i].innerHTML == "") {
      totalSpace --
    }
  }
  return totalSpace
}

function clearBoard() {
  for (let i = 0; i <9 ; i++) {
    board[i].innerHTML = ""
  }
  turn = 0
}

function fillBoard(state){
  for (let i = 0; i<9; i ++){
    board[i].innerHTML = state[i]
  }
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
  if (element.innerHTML == "") {
    //If a turn can be taken in this spot
    updateState(element)
    turn ++

    if(checkWinner()) {
      clearBoard()
    }

    if (boardFillCount() == 9) {
      setMessage("Tie game.")
      clearBoard()
    }
  }
}

function saveGame() {
  var state = board.toArray().map(element => element.innerHTML)
  var posting = $.post('/games', state)
}

function previousGame() {

}

function attachListeners() {
  board.each(function(index, element) {
    $(element).on("click", function() {
      if (!checkWinner()&&boardFillCount() <9){
        doTurn(this)
      }
    })
  })

  clearButton.on("click", function(){
    clearBoard()
  })

  saveButton.on("click", function() {
    saveGame()
  })

  previousButton.on("click", function() {

  })

}

$(document).ready(function initialize(){
  board = $("td")
  saveButton = $("button#save")
  previousButton = $("button#previous")
  clearButton = $("button#clear")
  attachListeners()
})
