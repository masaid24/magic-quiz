import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "potion", matched:false},
  {"src": "ring", matched:false},
  {"src": "scroll", matched:false},
  {"src": "shield", matched:false},
  {"src": "sword", matched:false},
  {"src": "helmet", matched:false},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() })) // ??

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }
  
  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched:true}
            } else {
              return card
            }
          })
        })
        resetTurns()
       } else {   
        setTimeout(() => resetTurns(), 1000)
       }
    }
  }, [choiceOne, choiceTwo])

  // reset choices and increse turn 
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game auto
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          /> 
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;