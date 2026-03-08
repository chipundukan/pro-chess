var board = null
var game = new Chess()

function onDragStart(source, piece) {

if (game.game_over()) return false

if (piece.search(/^b/) !== -1) return false

}

function onDrop(source, target) {

var move = game.move({
from: source,
to: target,
promotion: 'q'
})

if (move === null) return 'snapback'

updateMoves()

}

function onSnapEnd() {
board.position(game.fen())
}

function updateMoves(){

var history = game.history()

document.getElementById("moves").innerHTML =
history.join(" ")

}

function undoMove(){

game.undo()
board.position(game.fen())
updateMoves()

}

function resetBoard(){

game.reset()
board.start()
updateMoves()

}

var config = {

draggable:true,
position:'start',
onDragStart:onDragStart,
onDrop:onDrop,
onSnapEnd:onSnapEnd

}

board = Chessboard('board',config)
