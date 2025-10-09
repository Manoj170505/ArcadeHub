import React from 'react'
import { useState, useEffect } from 'react'
import Heart from '../assets/Heart-card.png'
import Moon from '../assets/Moon-card.png'
import Star from '../assets/Star-card.png'
import Sun from '../assets/Sun-card.png'
import Cloud from '../assets/Cloud-card.png'
import Comet from '../assets/Comet-card.png'
import Rocket from '../assets/Rocket-card.png'
import Saturn from '../assets/Saturn-card.png'
import bg from '../assets/Memory-bg.png'
import flipped from '../assets/Card-flipped.png' 
import { VscDebugRestart } from "react-icons/vsc";
import Win from '../assets/SoundEffects/Win.mp3'
import Flip from '../assets/SoundEffects/cardFlip.mp3'
import Match from '../assets/SoundEffects/Correct.mp3'

const MemoryMatch = () => {

  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const flip = new Audio(Flip)
  const match = new Audio(Match)

  const handleFlipsound = () => {
    flip.play()
  }

  const handleMatchsound = () => {
    match.play()
  }

  useEffect(() => {
    const cardImages = [Heart, Moon, Star, Sun, Cloud, Comet, Rocket, Saturn]
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, isFlipped: false }))
    setCards(shuffledCards)
  }, [])

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(cards[index].image)) {
      return
    }

    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)
    const newCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    )
    setCards(newCards)
    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards
      if (cards[firstIndex].image === cards[secondIndex].image && firstIndex !== secondIndex) {
        setMatchedCards([...matchedCards, cards[firstIndex].image])
        setFlippedCards([])
      } else {
        setTimeout(() => {
          const resetCards = cards.map((card, i) => 
            i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
          )
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  if (matchedCards.length === cards.length / 2 && cards.length > 0) {
    return (
      <div className='w-full h-screen bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center'>
        <audio src={Win} autoPlay />
        <h1 className='text-4xl font-bold text-white mb-6'>Congratulations! You've matched all the cards!</h1>
        <button className='bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded flex items-center gap-2' onClick={() => window.location.reload()}>
          <span>Restart</span> <VscDebugRestart />
        </button>
      </div>
    )
  }



  return (
    <div>
      <div className='w-full h-screen bg-cover bg-center flex flex-col items-center justify-start pt-10' style={{ backgroundImage: `url(${bg})` }}>
        <h1 className='text-4xl font-bold text-white mb-6'>Memory Match</h1>
        <div className='grid grid-cols-4 gap-4'>
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`w-24 h-32 perspective ${matchedCards.includes(card.image) ? 'opacity-50' : ''}`}
              onClick={() => { handleCardClick(index); handleFlipsound(); if (flippedCards.length === 1 && cards[flippedCards[0]].image === card.image) { handleMatchsound(); } }
              }
            >
              <div className={`relative w-full h-full duration-500 transform-style-preserve-3d ${card.isFlipped ? 'rotate-y-180' : ''}`}>
                <img
                  src={card.isFlipped || matchedCards.includes(card.image) ? card.image : flipped}
                  alt="card"
                  className="absolute w-full h-full backface-hidden rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MemoryMatch
