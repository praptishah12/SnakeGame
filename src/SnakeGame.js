import React from 'react';
import './SnakeGame.css';

class SnakeGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snake: [{ x: 10, y: 10 }],
            direction: 'RIGHT',
            food: { x: 50, y: 50 },
            speed: 200,
            isPlaying: false,
            score: 0
        };
    }

    checkCollision(head) {
        const { snake } = this.state;
        if (head.x < 0 || head.y < 0 || head.x >= 500 || head.y >= 500) {
            return true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    moveSnake = () => {
        let newSnake = [...this.state.snake];
        let head = { ...newSnake[0] };

        switch (this.state.direction) {
            case 'RIGHT':
                head.x += 10;
                break;
            case 'LEFT':
                head.x -= 10;
                break;
            case 'DOWN':
                head.y += 10;
                break;
            case 'UP':
                head.y -= 10;
                break;
            default:
                break;
        }

        if (this.checkCollision(head)) {
            this.gameOver();
            return;
        }

        newSnake.unshift(head);

        if (head.x === this.state.food.x && head.y === this.state.food.y) {
            this.setState(prevState => ({
                food: this.getRandomFoodPosition(),
                score: prevState.score + 1
            }));
        } else {
            newSnake.pop();
        }

        this.setState({ snake: newSnake });
    }

    gameOver = () => {
        clearInterval(this.moveInterval);
        this.setState({ isPlaying: false });
        this.props.onGameOver(this.state.score);
    }

    getRandomFoodPosition = () => {
        let min = 0;
        let max = 49;
        let x = Math.floor(Math.random() * (max - min + 1) + min) * 10;
        let y = Math.floor(Math.random() * (max - min + 1) + min) * 10;
        return { x, y };
    }

    startGame = () => {
        this.setState({
            snake: [{ x: 10, y: 10 }],
            direction: 'RIGHT',
            food: this.getRandomFoodPosition(),
            isPlaying: true,
            score: 0
        });
        clearInterval(this.moveInterval);
        this.moveInterval = setInterval(this.moveSnake, this.state.speed);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
      
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
        clearInterval(this.moveInterval);
    }
      
    handleKeyPress = (e) => {
        if (!this.state.isPlaying) return;

        const { direction } = this.state;
        switch (e.keyCode) {
            case 37: // left arrow
                if (direction !== 'RIGHT') this.setState({ direction: 'LEFT' });
                break;
            case 38: // up arrow
                if (direction !== 'DOWN') this.setState({ direction: 'UP' });
                break;
            case 39: // right arrow
                if (direction !== 'LEFT') this.setState({ direction: 'RIGHT' });
                break;
            case 40: // down arrow
                if (direction !== 'UP') this.setState({ direction: 'DOWN' });
                break;
            default:
                return;
        }
    }

    render() {
        const { snake, food, isPlaying, score } = this.state;
        return (
            <div className="game-container">
                <div>
                    <div className="game-area">
                        {snake.map((segment, index) => (
                            <div 
                                key={index} 
                                className="snake-segment" 
                                style={{ 
                                    left: `${segment.x - 1}px`, 
                                    top: `${segment.y - 1}px` 
                                }} 
                            />
                        ))}
                        <div 
                            className="food" 
                            style={{ 
                                left: `${food.x - 1}px`, 
                                top: `${food.y - 1}px` 
                            }} 
                        />
                    </div>
                    <div className="game-info">
                        <div className="current-score">Score: {score}</div>
                        <button 
                            className="start-button" 
                            onClick={this.startGame} 
                            disabled={isPlaying}
                        >
                            {isPlaying ? 'Game in Progress' : 'Start Game'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SnakeGame;