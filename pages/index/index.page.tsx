import { useState, useEffect } from "preact/hooks";
import type { cardType, cards } from "./types";
import { colors } from "./data";
import "./index.css";

export function Page() {
  const [cards, setCards] = useState<cards>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const [guesses, setGuesses] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);

  const renderCards = () => {
    const cardsArray: cards = [];
    const colorsArray = [2, 2, 2, 2, 2, 2, 2, 2];
    let colorsToSet = 16;
    let colorIndex = 0;

    for (let i = 0; i < 16; i++) {
      cardsArray.push({
        id: i,
        colorName: "",
        revealed: false,
        matched: false,
      });
    }

    while (colorsToSet > 0) {
      const index = Math.floor(Math.random() * 16);

      if (cardsArray[index].colorName === "") {
        if (colorsArray[colorIndex] > 0) {
          cardsArray[index].colorName = colors[colorIndex];
          colorsArray[colorIndex]--;
        } else {
          colorIndex++;
          cardsArray[index].colorName = colors[colorIndex];
          colorsArray[colorIndex]--;
        }

        colorsToSet--;
        console.log(colorsToSet);
      } else {
        continue;
      }
    }

    setCards(cardsArray);
  };

  useEffect(() => {
    renderCards();
  }, []);

  return (
    <div class="wrapper">
      <div class="cards">
        {cards.map((item) => (
          <div key={item.id} class={`card ${item.colorName}`}></div>
        ))}
      </div>
      <div class="info">
        <p>Guesses: {guesses}</p>
        <p>Matches: {matches}</p>
        <p>Percentage: {percentage}%</p>
      </div>
      <div class="buttons">
        <button>Restart</button>
      </div>
    </div>
  );
}
