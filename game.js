let board = null

const game = new Chess()

const historyDiv = document.getElementById("history")

function onDragStart(source, piece){

if(game.game_over()) return false

if(piece.search(/^b/) !== -1) return false

}

function onDrop(source, target){

let move = game.move({
from: source,
to: target,
promotion: "q"
})

if(move === null) return "snapback"

updateHistory()

setTimeout(aiMove,300)

}

function aiMove(){

if(game.game_over()) return

let moves = game.moves()

let randomMove = moves[Math.floor(Math.random()*moves.length)]

game.move(randomMove)

board.position(game.fen())

updateHistory()

}

function updateHistory(){

historyDiv.innerHTML = game.history().join("<br>")

}

function undoMove(){

game.undo()
game.undo()

board.position(game.fen())

updateHistory()

}

board = Chessboard("board",{

draggable: true,

position: "start",

onDragStart: onDragStart,

onDrop: onDrop

})
