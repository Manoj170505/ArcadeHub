import React from 'react'
import { Link } from 'react-router-dom'
import { CiDollar } from "react-icons/ci";

function Home() {


    return (
        <div className="">
            <div className="bg-black text-white bg-opacity-50 p-4 rounded-lg mb-8 gap-8 flex justify-center items-center">
                <p>AH.com</p>
                <img className='w-120 h-30' src="./src/assets/Arcadehub.png" alt="" />
                <p className='flex flex-row items-center justify-center gap-1 hover:scale-105 hover:text-shadow-lg hover:text-shadow-teal-300 cursor-pointer transition-transform duration-200'><CiDollar/>Contribution</p>
            </div>
        <div className='grid grid-cols-3 gap-4 items-center justify-items-center'>
            <Link to="Hangman" className="w-60 h-60 flex justify-center items-center flex-col">
                <img className='w-40 h-40 rounded-4xl hover:scale-105 transition-transform duration-300' src="./src/assets/Hangman-ico.png" alt="Hangman game" />
                <p className='text-white mt-2'>Hangman</p>
            </Link>
            <Link to="TicTacToe" className="w-60 h-60 flex justify-center items-center flex-col">
                <img className='w-40 h-40 rounded-4xl hover:scale-105 transition-transform duration-300' src="./src/assets/TicTacToe-ico.png" alt="Tic Tac Toe game" />
                <p className='text-white mt-2'>TicTacToe</p>
            </Link>
            <Link to="MemoryMatch" className="w-60 h-60 flex justify-center items-center flex-col">
                <img className='w-40 h-40 rounded-4xl hover:scale-105 transition-transform duration-300' src="./src/assets/Memorymatch-ico.png" alt="Memory match game" />
                <p className='text-white mt-2'>Memory Match</p>
            </Link>
        </div>
        </div>
    )
}

export default Home
