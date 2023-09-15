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
          <p>{item.id}</p>
        ))}
      </div>
      <div class="info"></div>
      <div class="buttons"></div>
    </div>
  );
}
