import { useEffect, useState } from "react";

function CardsPlayable({ setScore, setWin }) {
  const [currCards, setCards] = useState([]);
  const [usedCards, setCardClicked] = useState([]);

  useEffect(() => {
    const pokemonNames = [
      "bulbasaur",
      "charmander",
      "squirtle",
      "caterpie",
      "weedle",
      "pidgey",
      "rattata",
      "spearow",
      "ekans",
      "pikachu",
      "sandshrew",
      "mew",
      "clefairy",
      "vulpix",
      "jigglypuff",
      "zubat",
      "oddish",
      "paras",
      "venonat",
      "diglett",
      "meowth",
      "psyduck",
      "mankey",
      "growlithe",
    ];

    async function fetchData() {
      const images = await Promise.all(
        pokemonNames.map((pokemon) => fetchImages(pokemon)),
      );
      const imageMap = {};
      images.forEach(
        (data) => (imageMap[data.name] = data.sprites.front_default),
      );
      setCards(imageMap);
    }

    fetchData();
  }, []);

  function handleOnClick(e) {
    let clickedImage = e.target.alt.toString();
    if (usedCards.includes(clickedImage)) {
      setScore(0);
      setCardClicked([]);
      setWin("LOST");
      return;
    }

    setScore((score) => {
      if (score + 1 == 24) {
        setWin("WON");
      }
      return score + 1;
    });
    setCardClicked([...usedCards, clickedImage]);
    const newShuffle = shuffleImages(currCards);
    setCards(newShuffle);
  }

  return (
    <div className="game">
      <div className="board">
        {Object.entries(currCards).map(([name, image]) => (
          <img key={name} src={image} alt={name} onClick={handleOnClick} />
        ))}
      </div>
    </div>
  );
}

async function fetchImages(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    return response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

function shuffleImages(imagesObject) {
  let images = Object.entries(imagesObject);
  for (let i = 0; i < images.length; i++) {
    let indexOne = Math.floor(Math.random() * images.length - 1) + 1;
    let indexTwo = Math.floor(Math.random() * images.length - 1) + 1;

    [images[indexOne], images[indexTwo]] = [images[indexTwo], images[indexOne]];
  }

  return images.reduce((obj, val) => {
    obj[val[0]] = val[1];
    return obj;
  }, {});
}

export { CardsPlayable };
