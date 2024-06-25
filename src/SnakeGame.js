import React from 'react';
import './SnakeGame.css';

class SnakeGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          snake: [{ x: 10, y: 10 }],
          direction: 'RIGHT',
          food: { x: 50, y: 50 },
          speed: 200
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
            clearInterval(this.moveInterval);
            this.gameOver();
        }

        newSnake.unshift(head);

        if (head.x === this.state.food.x && head.y === this.state.food.y) {
          this.setState({ food: this.getRandomFoodPosition() });
        } else {
          newSnake.pop();
        }

        this.setState({ snake: newSnake });
    }
    gameOver = () => {
        const score = this.state.snake.length;
        this.props.onGameOver(score); // Call the passed in onGameOver prop with the score
      }
    getRandomFoodPosition = () => {
        let min = 0;
        let max = 49;
        let x = Math.floor(Math.random() * (max - min + 1) + min) * 10;
        let y = Math.floor(Math.random() * (max - min + 1) + min) * 10;
        return { x, y };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        this.moveInterval = setInterval(this.moveSnake, this.state.speed);
    }
      
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
        clearInterval(this.moveInterval);
    }
      
    handleKeyPress = (e) => {
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
        const { snake, food } = this.state;
        return (
          <div className="game-area">
            {snake.map((segment, index) => (
              <div key={index} className="snake-segment" style={{ left: `${segment.x}px`, top: `${segment.y}px` }} />
            ))}
            <div className="food" style={{ left: `${food.x}px`, top: `${food.y}px` }} />
          </div>
        );
    }
}

export default SnakeGame;