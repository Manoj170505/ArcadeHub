import React from 'react';
import XImg from '../assets/X-logo.png';
import OImg from '../assets/O-logo.png';
import { MdReplay } from "react-icons/md";
import Input from '../assets/SoundEffects/Input.mp3'
import Wins from '../assets/SoundEffects/XOwin.mp3'
const TicTacToe = () => {
    const [board, setBoard] = React.useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = React.useState(true);
    const [winner, setWinner] = React.useState(null);
    const inputSound = new Audio(Input);

    const handleInputSound = () => {
        inputSound.play();
    }

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) setWinner(gameWinner);
    };

    const calculateWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];  
        for (let line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const renderCellContent = (cell) => {
        if (!cell) return null;
        const imageSrc = cell === 'X' ? XImg : OImg;
        return (
            <img
                src={imageSrc}
                alt={cell}
                className="w-full h-full object-contain"
            />
        );
    };

    const getBorderClasses = (index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        
        // Internal vertical lines: right border on cols 0 and 1
        const borderRight = col < 2 
            ? 'border-r-4 border-white'
            : '';
        
        // Internal horizontal lines: bottom border on rows 0 and 1
        const borderBottom = row < 2 
            ? 'border-b-4 border-white'
            : '';
        
        // Teal glow shadow only on cells with internal borders (applied to the whole cell for simplicity)
        const glowShadow = (borderRight || borderBottom) 
            ? 'shadow-[0_0_8px_rgba(20,184,166,0.6)] hover:shadow-[0_0_12px_rgba(20,184,166,0.8)]'  // Teal-300 glow (rgb(20,184,166)), subtle and hover-enhanced
            : '';
        
        return `${borderRight} ${borderBottom} ${glowShadow}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 flex flex-col items-center justify-center p-8 font-sans">
            {/* Main title, centered and prominent */}
            <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg text-center tracking-wide">
                Tic Tac Toe
            </h1>
            
            {/* Grid container with no gap for seamless borders, rounded for polish, and subtle overall glow */}
            <div className='grid grid-cols-3 gap-0 w-60 h-60 rounded-lg overflow-hidden bg-gray-900 shadow-2xl shadow-teal-300/30 mx-auto'>
                {board.map((cell, index) => (
                    <div
                        key={index}
                        onClick={() => { handleClick(index); handleInputSound(); }}
                        className={`w-20 h-20 flex justify-center items-center cursor-pointer bg-transparent transition-all duration-200 ${getBorderClasses(index)}`}
                    >
                        {renderCellContent(cell)}
                    </div>
                ))}
            </div>
            
            {/* Status display: Winner or Next Player, centered and styled */}
            <div className="mt-8 text-center">
                {winner ? (
                    <div className="flex flex-col items-center w-screen h-screen bg-white/10 backdrop-blur-sm fixed top-0 left-0 justify-center">
                        <audio src={Wins} autoPlay />
                        <div className="flex justify-center items-center bg-[#f6ca40] bg-opacity-90 p-8 rounded-lg shadow-lg shadow-[#f6ca40]/60 border-2 border-white text-center">
                            <h2 className="text-2xl font-semibold text-white drop-shadow-md">
                                Winner is : {winner === 'X' ? <span className="text-[#fb39d7] text-3xl font-bold">X</span> : <span className="text-[#adee3c] text-3xl font-bold">O</span>}
                            </h2>
                        </div>
                        <button
                            onClick={() => {
                                setBoard(Array(9).fill(null));
                                setIsXNext(true);
                                setWinner(null);
                            }}
                            className="mt-6 p-4 bg-teal-500 text-white font-semibold rounded-full shadow-lg shadow-teal-300/50 hover:bg-teal-600 active:bg-teal-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300/50 text-3xl flex items-center justify-center"
                            aria-label="Restart Game"
                        >
                                <MdReplay />
                        </button>
                    </div>
                ) : (
                    <h2 className="text-2xl font-semibold text-white mb-4 drop-shadow-md">
                        Next Player: {isXNext ? <span className="text-[#fb39d7] text-3xl font-bold">X</span> : <span className="text-[#adee3c] text-3xl font-bold">O</span>}
                    </h2>
                )}
            </div>
            <button
                onClick={() => {
                    setBoard(Array(9).fill(null));
                    setIsXNext(true);
                    setWinner(null);
                }}
                className="mt-6 px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-lg shadow-teal-300/50 hover:bg-teal-600 active:bg-teal-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300/50 text-lg"
            >
                Reset Game
            </button>
        </div>
    );
};

export default TicTacToe;
