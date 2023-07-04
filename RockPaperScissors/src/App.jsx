import { useState } from "react";
import "./App.css";
import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa";

const actions = {
  rock:"scissors",
  paper:"rock",
  scissors:"paper"
}

function randomAction(){
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1,action2){
  if(action1===action2) return 0;
  else if(actions[action1] === action2) return -1;
  else if(actions[action2] === action1) return 1;
  return null;
}

const Player = ({ name = "Player", score = 0, action = "rock" }) => {
  return (
    <div className="player">
      <div className="h-6 bg-green-400 text-white">
        {name}: {score}
      </div>
      <div className="flex justify-center items-center h-full text-3xl">
        {action && <ActionIcon action={action} className="text-4xl" />}
      </div>
    </div>
  );
};

const ActionIcon = ({ action, ...props }) => {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };
  const Icon = icons[action];

  return <Icon {...props} />;
};

const ActionButton = ({ action = "rock", onActionSelected }) => {
  return (
    <button className="btn" onClick={() => onActionSelected(action)}>
      {" "}
      <ActionIcon action={action} className="mx-auto" />{" "}
    </button>
  );
};

const ShowWinner = ({winner=0}) => {
  const text = {
    "-1":"You Win!",
    "0":"Draw!",
    "1":"You lose!"
  }
  return (
    <h2 className="text-2xl">{text[winner]}</h2>
  )
}

function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");
  const [playerScore,setPlayerScore] = useState(0);
  const [computerScore,setComputerScore] = useState(0)
  const [winner,setWinner] = useState(0)

  const onActionSelected = (selectedAction) => {
    setPlayerAction(selectedAction);
    const newComputerAction = randomAction();
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction,newComputerAction);
    setWinner(newWinner);
    if(newWinner === -1){
      setPlayerScore(playerScore+1);
    }else if(newWinner === 1){
      setComputerScore(computerScore + 1);
    }
  };
  return (
    <div className="App text-center bg-blue-200 h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl font-semibold ">Rock Paper Scissors</h1>
      <div>
        <div className="container">
          <Player name="Player" score={playerScore} action={playerAction} />
          <Player name="Computer" score={computerScore} action={computerAction} />
        </div>
        <div>
          <ActionButton action="rock" onActionSelected={onActionSelected} />
          <ActionButton action="paper" onActionSelected={onActionSelected} />
          <ActionButton action="scissors" onActionSelected={onActionSelected} />
        </div>
        { playerAction && <ShowWinner winner={winner} />}
      </div>
    </div>
  );
}

export default App;
