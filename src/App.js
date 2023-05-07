import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./Components/SingleCard";

const cardImages = [
  { src: "/image/helmet-1.png", matched: false },
  { src: "/image/potion-1.png", matched: false },
  { src: "/image/ring-1.png", matched: false },
  { src: "/image/scroll-1.png", matched: false },
  { src: "/image/shield-1.png", matched: false },
  { src: "/image/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Duplication of images and getting random id
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    // choiceOne(null);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  //


  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  //

  // rest choices & increses turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);
  //
  return (
    <div className="App">
      <h1>memory game</h1>
      <button onClick={shuffleCards}>new game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            fliped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
      <p>Developed by Minoo Zarpoosh</p>
    </div>
  );
}

export default App;
