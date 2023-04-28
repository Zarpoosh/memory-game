import React from "react";
import "./SingleCard.css";

export default function SingleCard({ fliped, card, handleChoice, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={fliped ? "fliped" : "s"}>
        <img src={card.src} alt="cardfront" className="front" />
        <img
          src="image/cover.png"
          alt="cardback"
          className="back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
