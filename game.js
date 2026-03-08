var board = null
var game = new Chess()

function onDragStart (source, piece) {

  // stop if game over
  if (game.game_over()) return false

  // only allow white pieces
  if (piece.search(/^b/) !== -1) return false
}

function onDrop (source, target) {

  var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  })

  if (move === null) return 'snapback'

  window.setTimeout(makeRandomMove, 250)
}

function makeRandomMove () {

  var possibleMoves = game.moves()

  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])

  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop
}

board = Chessboard('board', config)
