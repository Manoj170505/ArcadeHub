import { useState,useEffect } from 'react'
import './App.css'
import Home from './Components/Home.jsx'
import Loader from './Components/Loader.jsx'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Hangman from './Components/Hangman.jsx'
import TicTacToe from './Components/TicTacToe.jsx'
import MemoryMatch from './Components/MemoryMatch.jsx'

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Hangman" element={<Hangman />} />
          <Route path="/TicTacToe" element={<TicTacToe />} />
          <Route path="/MemoryMatch" element={<MemoryMatch />} />
        </Routes>
      </div>
    </>
  )
}

export default App
