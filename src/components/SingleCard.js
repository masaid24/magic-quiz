import './SingleCard.css'

import ring from '../img/ring-1.png'
import cover from '../img/cover.png'
import potion from '../img/potion-1.png'
import shield from '../img/shield-1.png'
import sword from '../img/sword-1.png'
import scroll from '../img/scroll-1.png'
import helmet from '../img/helmet-1.png'

const Hash = {
  "cover" : cover,
  "ring" : ring,
  "potion" :potion,
  "shield" : shield,
  "sword" : sword,
  "scroll" : scroll,
  "helmet" : helmet
}

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
        handleChoice(card)
    }

  return (
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
              <img src={Hash[card.src]} className='front' alt='card front' />
              <img 
                className='back' 
                src={require('../img/cover.png' )}
                onClick={handleClick} 
                alt='card back' 
              />
            </div>
        </div>
  )
}
