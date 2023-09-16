import { useState, useEffect } from "preact/hooks";
import type { cardType, cards } from "./types";
import { colors } from "./data";
import "./index.css";
import "./colors.css";

export function Page() {
  const [cards, setCards] = useState<cards>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const [guesses, setGuesses] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [cardsRevealed, setCardsRevealed] = useState<number>(0);
  const [match, setMatch] = useState([]);

  const restart = () => {
    window.location.href = "/";
  };

  const checkCards = () => {
    if (cardsRevealed < 1) return;

    const card1 = cards[match[0]];
    const card2 = cards[match[1]];
    const cardsArray = cards;

    console.log(card1);
    console.log(card2);

    setTimeout(() => {
      if (card1.colorName === card2.colorName) {
        cardsArray[card1.id].matched = true;
        cardsArray[card2.id].matched = true;
        setMatches((prev) => prev + 1);
        setPercentage((prev) => prev + 12.5);

        if (percentage > 100) {
          setPercentage(100);
        }
      } else {
        cardsArray[card1.id].revealed = false;
        cardsArray[card2.id].revealed = false;
      }

      setMatch([]);
      setCards(cardsArray);
      setCardsRevealed(0);
      setGuesses((prev) => prev + 1);
    }, 600);
  };

  const revealCard = (e) => {
    const cardsArray = cards;
    const matchesArray = match;

    if (cardsRevealed >= 2) return;
    if (e.target.className !== "card") return;

    setCardsRevealed((prev) => prev + 1);
    cardsArray[Number(e.target.id)].revealed = true;
    matchesArray.push(Number(e.target.id));

    checkCards();
  };

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
          <div
            id={String(item.id)}
            key={item.id}
            class={
              item.matched || item.revealed ? `card ${item.colorName}` : `card`
            }
            onClick={(e) => revealCard(e)}
          ></div>
        ))}
      </div>
      <div class="info">
        <p>Guesses: {guesses}</p>
        <p>Matches: {matches}</p>
        <p>Percentage: {percentage}%</p>
      </div>
      <div class="buttons">
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
}
