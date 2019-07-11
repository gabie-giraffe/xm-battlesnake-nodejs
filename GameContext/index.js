class GameContext {

    constructor(board) {
        console.log(board)
        this.board = board;
        this.stateHistory = [];
        this.moveHistory = [];
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
        this.stateHistory.shift(gameState);
        this.findFood()

        const options = Object.entries(this.move)
            .sort((a, b) => b[1] - a[1]);

        return options[0][0];
    }

    findFood() {
        let mySnake = this.getMySnake()

        let head = mySnake.coords[0];

        if (this.gameState.food[0][0] < head[0]) {
            this.move.left++;
        }

        if (this.gameState.food[0][0] > head[0]) {
            this.move.right++;
        }

        if (this.gameState.food[0][1] < head[1]) {
            this.move.up++;
        }

        if (this.gameState.food[0][1] > head[1]) {
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

    }

}

module.exports = GameContext;