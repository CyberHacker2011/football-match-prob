import { useState } from "react";
import Card from "./components/card";
import clubs from "./data/clubs";

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getWinner(teamA, teamB) {
  const ratingA = clubs[teamA];
  const ratingB = clubs[teamB];
  const probA = ratingA / (ratingA + ratingB);
  return Math.random() < probA ? teamA : teamB;
}

function getWinProbability(team, roundPairs) {
  for (const [teamA, teamB] of roundPairs) {
    if (teamA === team || teamB === team) {
      const ratingA = clubs[teamA];
      const ratingB = clubs[teamB];
      const prob = teamA === team
        ? ratingA / (ratingA + ratingB)
        : ratingB / (ratingA + ratingB);
      return prob;
    }
  }
  return 0;
}

function App() {
  const allTeams = Object.keys(clubs);
  const [chosenTeam, setChosenTeam] = useState('');
  const [currentRound, setCurrentRound] = useState(shuffleArray(allTeams));
  const [previousRound, setPreviousRound] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [stage, setStage] = useState(1);

  const getStageName = (len) => {
    switch (len) {
      case 16: return 'Round of 16';
      case 8: return 'Quarterfinals';
      case 4: return 'Semifinals';
      case 2: return 'Final';
      default: return 'Tournament';
    }
  };

  const handleNextStage = () => {
    const winners = [];
    for (let i = 0; i < currentRound.length; i += 2) {
      const teamA = currentRound[i];
      const teamB = currentRound[i + 1];
      winners.push(getWinner(teamA, teamB));
    }

    const roundLen = currentRound.length;

    if (!winners.includes(chosenTeam)) {
      let place = '';
      if (roundLen === 2 && previousRound.includes(chosenTeam)) {
        place = '2nd';
      } else if (roundLen === 4) {
        place = '3rd';
      } else if (roundLen === 8) {
        place = 'Top 8';
      } else if (roundLen === 16) {
        place = 'Top 16';
      } else {
        place = 'Top ' + roundLen;
      }

      setGameOver(true);
      setMessage(`💔 Your team was eliminated in the ${getStageName(roundLen)}. Final placement: ${place}`);
    } else if (winners.length === 1) {
      setGameOver(true);
      setMessage("🎉 Congrats! Your team won the tournament!");
    } else {
      setMessage(`✅ ${chosenTeam} advances to the ${getStageName(winners.length)}`);
    }

    setPreviousRound(currentRound);
    setCurrentRound(winners);
    setStage(stage + 1);
  };

  const handleRestart = () => {
    setCurrentRound(shuffleArray(allTeams));
    setChosenTeam('');
    setPreviousRound([]);
    setGameOver(false);
    setMessage('');
    setStage(1);
  };

  const pairs = currentRound.length > 1
    ? Array.from({ length: Math.floor(currentRound.length / 2) }, (_, i) => [
        currentRound[i * 2],
        currentRound[i * 2 + 1],
      ])
    : [];

  return (
    <main className="min-h-screen overflow-hidden p-5 flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-2">
        {chosenTeam ? `You chose ${chosenTeam.toUpperCase()}` : "Choose a team to start the tournament!"}
      </h1>

      {chosenTeam && pairs.length > 0 && (
        <p className="text-sm text-gray-700 mb-4 text-center">
          Win chance this round:{" "}
          <span className="font-semibold text-green-700">
            {Math.round(getWinProbability(chosenTeam, pairs) * 100)}%
          </span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-24 gap-y-4">
        {pairs.map((pair, index) => (
          <div key={index} className="flex justify-center items-center gap-3">
            <Card
              club={pair[0]}
              onClick={() => !chosenTeam && setChosenTeam(pair[0])}
              isSelected={chosenTeam === pair[0]}
            />
            <span className="font-semibold text-gray-800">vs</span>
            <Card
              club={pair[1]}
              onClick={() => !chosenTeam && setChosenTeam(pair[1])}
              isSelected={chosenTeam === pair[1]}
            />
          </div>
        ))}
      </div>

      <div className="text-center text-lg mt-4 text-blue-800 min-h-[2rem]">{message}</div>

      <div className="flex justify-end px-10">
        {!chosenTeam ? null : gameOver ? (
          <button
            onClick={handleRestart}
            className="rounded bg-red-400 text-white text-sm py-2 px-5 mt-5"
          >
            Restart
          </button>
        ) : (
          <button
            onClick={handleNextStage}
            className="rounded bg-amber-300 text-sm py-2 cursor-pointer px-5 mt-5"
          >
            Next Stage
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
