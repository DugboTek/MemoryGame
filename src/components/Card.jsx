import React, { Component } from 'react';
import '../CSS/Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: props.isFlipped || false,
    };
  }

  //flipFront function that flips card to front
  flipFront = () => {
    this.setState({ isFlipped: false });
  };

  flipBack = () => {
    this.setState({isFlipped:true});
  }

  flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  handleClick = () => {
    this.props.onClick();
  }

  render() {
    const { frontColor, backColor, onClick } = this.props;
    const { isFlipped } = this.state;

    return (
      <div
        className={`card ${isFlipped ? 'flipped' : ''}`}
         onClick={onClick}
      >
        <div
          className="card-face card-front"
          style={{ backgroundColor: frontColor }}
        ></div>
        <div
          className="card-face card-back"
          style={{ backgroundColor: backColor }}
        ></div>
      </div>
    );
  }
}

export default Card;
