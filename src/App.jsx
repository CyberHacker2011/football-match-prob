import { useState } from "react";
import Card from "./components/card";
import clubs from "./data/clubs";

function App() {
  const [chosenTeam, setChosenTeam] = useState('');
  console.log(chosenTeam);

  const array = Object.keys(clubs);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffle(array);

  const shuffled = [];
  for (let i = 0; i < array.length; i += 2) {
    shuffled.push([array[i], array[i + 1]]);
  }

  return (
    <div className="flex flex-col gap-5">
      {shuffled.map((pair, index) => (
        <div key={index} className="flex justify-center items-center gap-2">
          <Card club={pair[0]} onClick={() => setChosenTeam(pair[0])} isSelected={chosenTeam === pair[0]} />
          <h1>vs</h1>
          <Card club={pair[1]} onClick={() => setChosenTeam(pair[1])} isSelected={chosenTeam === pair[1]} />
        </div>
      ))}
    </div>
  );
}

export default App;
