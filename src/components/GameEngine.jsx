import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import '../CSS/GameContainer.css';

const cards = [
  { frontColor: 'tan', backColor: 'blue' },
  { frontColor: 'tan', backColor: 'orange' },
  { frontColor: 'tan', backColor: 'green' },
  { frontColor: 'tan', backColor: 'yellow' },
  { frontColor: 'tan', backColor: 'purple' },
  { frontColor: 'tan', backColor: 'lightblue' },
  { frontColor: 'tan', backColor: 'red' },
  { frontColor: 'tan', backColor: 'lightgreen' },
  { frontColor: 'tan', backColor: 'pink' },
  // add more cards as needed
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffledCards = shuffle(cards);
const correctOrder = shuffledCards.map((card, i) => i);

const GameEngine = () => {
  const [UserflippedCards, setUserFlippedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isCorrectOrder, setIsCorrectOrder] = useState(null);
  const [isIncorrectOrder, setIsIncorrectOrder] = useState(false);
  const [levelUp, setLevelUp] = useState(false);
  
  const [level, setLevel] = useState(3);
  const cardRefs = useRef([]);
  const cardContainerRef = useRef(null);

  //useEffect hook that checks if UserFlippedCards contains every element in flippedCards no matter the order
  useEffect(() => {
    const isCorrect = (UserflippedCards.length>0)&&(UserflippedCards.length === flippedCards.length) && UserflippedCards.every((card, index) => card === flippedCards[index]);   
    console.log("🚀 ~ file: GameEngine.jsx:42 ~ useEffect ~ isCorrect:", isCorrect)
    if(isCorrect){
      setIsCorrectOrder(isCorrect);
      setIsIncorrectOrder(false);

      console.log("isCorrectOrder:", isCorrectOrder);
      
    }
    const lastClickedCard = UserflippedCards[UserflippedCards.length - 1];
    console.log("last clicked card",lastClickedCard);
    
    
    
    console.log(UserflippedCards);
    //if userflippedCards contains an element that is not in flippedCards set endGame to true
    if(!(UserflippedCards.every((card) => flippedCards.includes(card)))){
      console.log("not correct card");
      endGame();
    }
    else if (UserflippedCards.length > 0) {
      if (lastClickedCard !== flippedCards[UserflippedCards.length - 1]) {
        endGame();
      }
     
    }

  }, [UserflippedCards]);


  // useEffect(() => {
  //   console.log("incorrect order",isIncorrectOrder)
  //   if(isIncorrectOrder){
  //     endGame();
  //   }
  // }, [isIncorrectOrder]);

  useEffect(() => {
    //why is this part not logging out
    console.log("correct Orderrr",isCorrectOrder);
    if (isCorrectOrder) {
      console.log("went in here");
      setIsCorrectOrder(false);
      setTimeout(() => {
        setLevelUp(true)
        nextLevel();
      }, 1000);
    }
  }, [isCorrectOrder]);

  useEffect(() => {
    if(levelUp){
      handleNewGame(level);
    }
    
  }, [level,levelUp]);


  //endGame function
  const endGame = () => {
    setIsCorrectOrder(false);
    setLevelUp(false);
    setLevel(3);
    cardContainerRef.current.classList.add('shake');
    setTimeout(() => {
      cardContainerRef.current.classList.remove('shake');
      handleNewGame();
    },(1000));
  }


  


  //a function that returns an array of size x defined by the input parameters and fill each element in the array with with a random number between 0 and y as y is set in the paremters of the function
  const generateRandomArray = (level, max) => {
    const randomArray = [];
    while (randomArray.length < level) {
      const num = Math.floor(Math.random() * max);
      if (!randomArray.includes(num)) {
        randomArray.push(num);
      }
    }
    console.log("🚀 ~ file: GameEngine.jsx:110 ~ generateRandomArray ~ randomArray:", randomArray)

    return randomArray;
  };
  

    const flipCards = (randomIndices) =>{
        resetCards();
        randomIndices.forEach((index, idx) => {
            setTimeout(() => {
              cardRefs.current[index].flipBack();
            }, (idx + 1) * 1000); // Delay each card flip by (idx + 1) seconds
          });
          setTimeout(() => {
            randomIndices.forEach((index) => {
              cardRefs.current[index].flipFront();
            });
          }, (randomIndices.length + 1) * 1000); // Flip back after all random indices are flipped
    };

   //reset all cards by calling each card .flipFront()
    const resetCards = () => {
        cardRefs.current.forEach((card) => card.flipFront());
    };

    const handleNewGame = (inputLevel) => {
      const level = inputLevel || 3; // Use the inputLevel if provided, otherwise default to 3
      console.log("🚀 ~ file: GameEngine.jsx:139 ~ handleNewGame ~ level:", level)
      setUserFlippedCards([]);
      const randomIndices = generateRandomArray(level, 9);
      flipCards(randomIndices);
      setFlippedCards(randomIndices);
    };

    const newGame = () => {
      setLevelUp(false);
      setLevel(3);
      const level = 3; // Use the inputLevel if provided, otherwise default to 3
      console.log("🚀 ~ file: GameEngine.jsx:139 ~ handleNewGame ~ level:", level)
      setUserFlippedCards([]);
      const randomIndices = generateRandomArray(level, 9);
      flipCards(randomIndices);
      setFlippedCards(randomIndices);
    };

  const nextLevel = () => {
    console.log("next level");
    //set userFlippedCards to empty
    setLevelUp(true);
    setLevel(level+1);
    setUserFlippedCards([]);
   
  };


  const handleCardClick = (index) => {
    if (UserflippedCards.includes(index)) {
      // Card is already in UserflippedCards, do nothing
      return;
    }
    
    cardRefs.current[index].flipBack();
    console.log("clicked Card", index);
    setUserFlippedCards([...UserflippedCards, index]);
  };
  

  

  return (
    <div className="game">
      <div className="game-status">
        {isCorrectOrder ? <p>Correct Next Level</p> : <p>Flip the cards in the correct order.</p>}
      </div>
      <div className='levelContainer'>
        LEVEL: {level-2}
      </div>
      <div className="cardContainer" ref ={cardContainerRef}>
        {cards.map((card, i) => (
          <Card
            key={i}
            frontColor={card.frontColor}
            backColor={card.backColor}
            onClick={() => handleCardClick(i)}
            ref={(ref) => (cardRefs.current[i] = ref)}
          />
        ))}
      </div>
      <div className="game-controls">
        <button onClick={()=>newGame()}>New Game</button>
      </div>
    </div>
  );
};

export default GameEngine;
