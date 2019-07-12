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

        this.updateBoardMatrix();
        this.checkColisions();
        this.findFood()

        const options = Object.entries(this.move)
            .sort((a, b) => b[1] - a[1]);

        console.log(options);

        return options[0][0];
    }

    findFood() {
        if (this.gameState.food.length === 0) {
            return;
        }

        const distance = this.getDistances(this.gameState.food[0]);
        const distancesSorted = Object.entries(distance)
            .sort((a, b) => b[1] - a[1]);

        // Find lowest distance available
        let direction;
        for (let i = 0; i <= distancesSorted.length; i++) {
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

    myHead() {
        let mySnake = this.getMySnake()
        return mySnake.coords[0];
    }

    isOnLeftBorder() {
        return this.myHead()[0] === 0
    }

    isOnRightBorder() {
        return this.myHead()[0] === this.board.width - 1
    }

    isOnTopBorder() {
        return this.myHead()[1] === 0
    }

    isOnBottomBorder() {
        return this.myHead()[1] === this.board.height - 1
    }

    checkColisions() {
        let head = this.myHead()

        this.move.up = this.isOnTopBorder()
            ? 0
            : this.boardMatrix[head[1] - 1][head[0]];

        this.move.down = this.isOnBottomBorder()
            ? 0
            : this.boardMatrix[head[1] + 1][head[0]];

        this.move.left = this.isOnLeftBorder()
            ? 0
            : this.boardMatrix[head[1]][head[0] - 1];

        this.move.right = this.isOnRightBorder()
            ? 0
            : this.boardMatrix[head[1]][head[0] + 1];
    }

    getDistances(food) {
        const head = this.myHead();

        return {
            up: head[1] - food[1],
            down: -(head[1] - food[1]),
            left: head[0] - food[0],
            right: -(head[0] - food[0]),
        };
    }

    updateBoardMatrix() {
        this.boardMatrix = []; // y, x
        for (let y = 0; y < this.board.height; y++) {
            this.boardMatrix.push(new Array(this.board.width).fill(1))
        }

        this.gameState.snakes.forEach(snake => {
            snake.coords.forEach(c => this.boardMatrix[c[1]][c[0]] = 0)
        })

        this.gameState.food.forEach(f => this.boardMatrix[f[1]][f[0]] > 0
            ? this.boardMatrix[f[1]][f[0]]++
            : 0
        );

        console.log('makeObstacleMatrix');
        this.boardMatrix.forEach(row => console.log(row));
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