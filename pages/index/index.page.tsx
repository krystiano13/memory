import { useState, useEffect } from "preact/hooks";
import type { cardType, cards } from "./types";
import "./index.css";

export function Page() {
  const [cards, setCards] = useState<cards>([]);

  const renderCards = () => {
    const cardsTemplate: cards = [];

    for (let i = 0; i < 16; i++) {
      cardsTemplate.push({
        id: i,
        colorName: "",
        matched: false,
        revealed: false,
      });
    }

    setCards(cardsTemplate);
  };

  useEffect(() => {
    renderCards();
  }, []);

  return (
    <div class="wrapper">
      <div class="cards">
        {cards.map((item) => (
          <div key={item.id} class="card"></div>
        ))}
      </div>
      <div class="info">
        <p>Guesses: 0</p>
        <p>Matches: 0</p>
        <p>Percentage: 0%</p>
      </div>
      <div class="buttons">
        <button>Restart</button>
      </div>
    </div>
  );
}
