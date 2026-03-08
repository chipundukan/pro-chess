// create game instance
var game = new Chess()

// board variable
var board = null

// move history display
var historyDiv = document.getElementById("history")

// prevent illegal moves and black moves by player
function onDragStart(source, piece) {

    // stop if game over
    if (game.game_over()) return false

    // allow only white pieces to move
    if (piece.search(/^b/) !== -1) return false
}

// handle piece drop
function onDrop(source, target) {

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    })

    // illegal move
    if (move === null) return 'snapback'

    updateHistory()

    // AI move
    window.setTimeout(makeRandomMove, 300)
}

// simple AI move
function makeRandomMove() {

    if (game.game_over()) return

    var possibleMoves = game.moves()

    if (possibleMoves.length === 0) return

    var randomIndex = Math.floor(Math.random() * possibleMoves.length)

    game.move(possibleMoves[randomIndex])

    board.position(game.fen())

    updateHistory()
}

// update move list
function updateHistory() {

    var history = game.history()

    historyDiv.innerHTML = history.join("<br>")
}

// undo last moves
function undoMove() {

    game.undo()
    game.undo()

    board.position(game.fen())

    updateHistory()
}

// reset game
function resetGame() {

    game.reset()

    board.start()

    historyDiv.innerHTML = ""
}

// initialize board AFTER page loads
window.onload = function () {

    var config = {

        draggable: true,

        position: 'start',

        onDragStart: onDragStart,

        onDrop: onDrop

    }

    board = Chessboard('board', config)

}
