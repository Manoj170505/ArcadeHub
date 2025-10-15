import React from 'react';
import { useState, useEffect } from 'react';
import { VscDebugRestart } from "react-icons/vsc";
import Hangman0 from '../assets/Hangman0.png';
import Hangman1 from '../assets/Hangman1.png';
import Hangman2 from '../assets/Hangman2.png';
import Hangman3 from '../assets/Hangman3.png';
import Hangman4 from '../assets/Hangman4.png';
import Hangman5 from '../assets/Hangman5.png';
import Hangman6 from '../assets/Hangman6.png';
import bg from '../assets/Hangman-bg.png';

const Hangman = () => {
  const [word, setWord] = React.useState("");
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  const [wrongGuesses, setWrongGuesses] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState("playing"); // "won", "lost"
  const [displayedWord, setDisplayedWord] = React.useState("");
  const maxWrongGuesses = 6;
  const words = [
    {
      "word": "AUTOPILOT",
      "hint": "Allows a car or plane to steer itself."
    },
    {
      "word": "TESLA",
      "hint": "A famous electric car company and inventor."
    },
    {
      "word": "ALGORITHM",
      "hint": "A set of rules a computer follows to solve a problem."
    },
    {
      "word": "CHASSIS",
      "hint": "The main structural framework of a car."
    },
    {
      "word": "JEFFERSON",
      "hint": "Third President of the United States."
    },
    {
      "word": "TURBOCHARGER",
      "hint": "Increases an engine's power using exhaust gases."
    },
    {
      "word": "MICROSOFT",
      "hint": "Company co-founded by Bill Gates."
    },
    {
      "word": "SPEAKER",
      "hint": "A device that converts electrical signals into sound."
    },
    {
      "word": "SENATOR",
      "hint": "An elected official in a country's legislative body."
    },
    {
      "word": "HYBRID",
      "hint": "A car that uses both gasoline and electric power."
    },
    {
      "word": "SILICON",
      "hint": "The main element used in computer chips."
    },
    {
      "word": "AMAZON",
      "hint": "Giant e-commerce company led by Jeff Bezos."
    },
    {
      "word": "CABINET",
      "hint": "The advisory council for a head of state."
    },
    {
      "word": "CRUISE",
      "hint": "To drive at a steady, comfortable speed."
    },
    {
      "word": "WINSTON",
      "hint": "Churchill, the Prime Minister of the UK during WWII."
    },
    {
      "word": "PROCESSOR",
      "hint": "The 'brain' of a computer, or CPU."
    },
    {
      "word": "GOVERNOR",
      "hint": "The elected leader of a U.S. state."
    },
    {
      "word": "CYLINDER",
      "hint": "The part of the engine where fuel is ignited."
    },
    {
      "word": "NETWORK",
      "hint": "Connecting multiple computers together."
    },
    {
      "word": "MACBOOK",
      "hint": "A popular laptop brand from Apple."
    },
    {
      "word": "DICTATOR",
      "hint": "A ruler with total power over a country."
    },
    {
      "word": "TRANSMISSION",
      "hint": "The system that shifts gears in a car."
    },
    {
      "word": "SOFTWARE",
      "hint": "Programs and data used to operate computers."
    },
    {
      "word": "ENGINEERING",
      "hint": "The discipline of designing and building complex systems."
    },
    {
      "word": "PRESIDENT",
      "hint": "The highest elected position in many republics."
    },
    {
      "word": "COUPE",
      "hint": "A two-door car body style."
    },
    {
      "word": "PASSWORD",
      "hint": "A secret string of characters for authentication."
    },
    {
      "word": "MONGOL",
      "hint": "The empire ruled by Genghis Khan."
    },
    {
      "word": "BATTERY",
      "hint": "Provides electrical power to start a car or run a device."
    },
    {
      "word": "AERODYNAMIC",
      "hint": "Designed to move through the air with least resistance."
    }
  ];

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)].word;
    setWord(randomWord);
    setDisplayedWord("_ ".repeat(randomWord.length).trim());
  }, []);

  if (gameStatus === "won") {
    return (
      <div className='w-full h-screen bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden'>
        <h1 className='text-4xl font-bold text-white mb-6 shadow-md'>You Guessed Right! It is {word}</h1>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded flex items-center gap-2 shadow-md'
          onClick={() => window.location.reload()}
        >
          <span>Restart</span> <VscDebugRestart />
        </button>
      </div>
    );
  } else if (gameStatus === "lost") {
    return (
      <div className='w-full h-screen bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden'>
        <h1 className='text-4xl font-bold text-white mb-6 shadow-md'>Game Over! The word was: {word}</h1>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded flex items-center gap-2 shadow-md'
          onClick={() => window.location.reload()}
        >
          <span>Restart</span> <VscDebugRestart />
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-start p-4 overflow-hidden font-sans text-white" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <nav className="w-full bg-transparent p-4 flex justify-start">
        <button 
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 rounded font-semibold shadow-sm"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </nav>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="flex flex-row justify-between w-full max-w-4xl p-4">
        
          <div className="flex flex-col items-center w-1/2">
            <img
              src={[Hangman0, Hangman1, Hangman2, Hangman3, Hangman4, Hangman5, Hangman6][wrongGuesses]}
              alt={`Hangman state ${wrongGuesses}`}
              className="w-48 h-48 object-contain mb-4"
            />
            <p className="text-lg font-semibold italic text-center border-b border-gray-600 pb-2">
              Hint: {words.find(w => w.word === word)?.hint}
            </p>
          </div>
          
          <div className="w-1/2 flex justify-end">
            <div className="w-64">
              <div className="grid grid-cols-6 gap-2">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                  <button
                    key={letter}
                    onClick={() => {
                      if (gameStatus !== "playing" || guessedLetters.includes(letter)) return;
                      setGuessedLetters([...guessedLetters, letter]);
                      if (word.includes(letter)) {
                        const newDisplayed = word.split('').map(l => (guessedLetters.includes(l) || l === letter ? l : '_')).join(' ');
                        setDisplayedWord(newDisplayed);
                        if (!newDisplayed.includes('_')) {
                          setGameStatus("won");
                        }
                      } else {
                        const newWrongGuesses = wrongGuesses + 1;
                        setWrongGuesses(newWrongGuesses);
                        if (newWrongGuesses >= maxWrongGuesses) {
                          setGameStatus("lost");
                          setDisplayedWord(word.split('').join(' '));
                        }
                      }
                    }}
                    disabled={guessedLetters.includes(letter) || gameStatus !== "playing"}
                    className={`p-3 rounded font-bold shadow-sm transition-colors ${
                      guessedLetters.includes(letter)
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full flex justify-center mt-auto p-4">
          <p className="text-3xl font-bold tracking-widest bg-gray-800 p-4 rounded shadow-md">
            {displayedWord}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hangman;
