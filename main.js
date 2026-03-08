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
    promotion: "q"
  })

  if (move === null) return "snapback"

  updateHistory()
}

function onSnapEnd() {
  board.position(game.fen())
}

function updateHistory() {
  document.getElementById("history").innerHTML = game.history().join("<br>")
}

function undoMove() {
  game.undo()
  game.undo()
  board.position(game.fen())
  updateHistory()
}

function resetGame() {
  game.reset()
  board.start()
  document.getElementById("history").innerHTML = ""
}

window.onload = function () {
  board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  })
}
