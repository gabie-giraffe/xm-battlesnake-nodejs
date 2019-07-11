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
        this.mySnake = this.getMySnake()

        this.checkBorders();
        this.detectAllSnakes();
        //this.checkSnakes();
        this.findFood()

        const options = Object.entries(this.move)
            .sort((a, b) => b[1] - a[1]);

        console.log(options);

        return options[0][0];
    }

    findFood() {
        let head = this.mySnake.coords[0];
        if (this.gameState.food.length === 0) {
            return;
        }

        this.getDistances(this.gameState.food[0], head);
        const distancesSorted = Object.entries(this.distances)
            .sort((a, b) => b[1] - a[1]);

        // Find lowest distance available
        let direction;
        for (let i = 0; i < distancesSorted.length; i++) {
            if (this.move[distancesSorted[i][0]] != 0) {
                direction = distancesSorted[i][0];
                break;
            }
        }

        if (direction == "left") {
            this.move.left++;
        }

        if (direction == "right") {
            this.move.right++;
        }

        if (direction == "up") {
            this.move.up++;
        }

        if (direction == "down") {
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

    checkBorders() {
        let mySnake = this.getMySnake()
        let head = mySnake.coords[0];

        console.log(`${head}, ${this.board}`);

        if (head[0] === 0) {
            this.move.left = 0;
        }

        if (head[0] === this.board.width - 1) {
            this.move.right = 0;
        }

        if (head[1] === 0) {
            this.move.up = 0;
        }

        if (head[1] === this.board.height - 1) {
            this.move.down = 0;
        }
    }

    getDistances(food, head) {
        this.distances = {
            up: head[1] - food[1],
            down: -(head[1] - food[1]),
            left: head[0] - food[0],
            right: -(head[0] - food[0]),
        };
    }

    detectAllSnakes() {
        let mySnake = this.getMySnake()
        for(let i=0; i<this.gameState.snakes.length; i++){
            let currentSnake = this.gameState.snakes[i];
            this.detectSnake(currentSnake, mySnake);
        }
    }

    detectSnake(snake, mySnake) {
        let head = mySnake.coords[0];
        for(let i=0; i<snake.coords.length; i++){
            let current = snake.coords[i];
            // left
            if (current[0] == (head[0] - 1) && (current[1] == head[1])) {
                this.move.left = 0;
            }
            // right
            if (current[0] == (head[0] + 1) && (current[1] == head[1])) {
                this.move.right = 0;
            }
            // up
            if (current[1] == (head[1] - 1) && (current[0] == head[0])) {
                this.move.up = 0;
            }
            // down
            if (current[1] == (head[1] + 1) && (current[0] == head[0])) {
                this.move.down = 0;
            }
        }
    }
}

// Polyfill for Object.entries
if (!Object.entries) {
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array

        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
    };
}

module.exports = GameContext;