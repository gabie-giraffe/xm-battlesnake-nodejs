class GameContext {

    constructor(board) {
        console.log(board)
        this.board = board;
    }

    nextMove(gameState) {

        // NOTE: Do something here to generate your move
        console.log(gameState)

        this.move = {
            up: 1,
            down: 1,
            left: 1,
            right: 1,
        };

        this.gameState = gameState;

        this.checkBorders();
        this.checkSnakes();
        this.findFood()

        const options = Object.entries(this.move)
            .sort((a, b) => b[1] - a[1]);

        console.log(options);

        return options[0][0];
    }

    findFood() {
        let mySnake = this.getMySnake()
        let head = mySnake.coords[0];

        if(this.gameState.food.length === 0) {
            return;
        }

        if (this.gameState.food[0][0] < head[0] && this.move.left) {
            this.move.left++;
        }

        if (this.gameState.food[0][0] > head[0] && this.move.right) {
            this.move.right++;
        }

        if (this.gameState.food[0][1] < head[1] && this.move.up) {
            this.move.up++;
        }

        if (this.gameState.food[0][1] > head[1] && this.move.down) {
            this.move.down++;
        }
    }

    getMySnake() {
        return this.getSnake(this.gameState.you)
    }

    getSnake(id) {
        let snake = this.gameState.snakes.find(snake => snake.id === id)
        return snake;
    }

    detectBorders() {
        let mySnake = this.getMySnake()
        let head = mySnake.coords[0];

        if (head[0] === 0) {
            this.move.left = 0;
        }

        if (head[0] === this.board.width - 1) {
            this.move.right = 0;
        }

        if (head[1] === 0) {
            this.move.up = 0;
        }

        if (head[0] === this.board.height - 1) {
            this.move.down = 0;
        }
    }

}

// Polyfill for Object.entries
if (!Object.entries) {
   Object.entries = function( obj ){
      var ownProps = Object.keys( obj ),
         i = ownProps.length,
         resArray = new Array(i); // preallocate the Array

      while (i--)
         resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
   };
}

module.exports = GameContext;