import { useEffect, useState } from "react";

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

function CardsPlayable({ setScore }) {
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
      return;
    }
    setScore((score) => score + 1);
    setCardClicked([...usedCards, clickedImage]);
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

export { CardsPlayable };
