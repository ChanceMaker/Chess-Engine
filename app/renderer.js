var config = {
    draggable: true,
    position:'start'
  }
  var board = Chessboard('board1', config)
  
  $(window).resize(board.resize)

  function clickShowPositionBtn () {
    console.log('Current position as an Object:')
    console.log(board.position())
  
    console.log('Current position as a FEN string:')
    console.log(board.fen())
  }

  
  $('#showPositionBtn').on('click', clickShowPositionBtn)