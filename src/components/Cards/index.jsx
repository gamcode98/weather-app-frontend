import { Card } from '../Card'
import { Link } from 'react-router-dom'
import './Cards.css'
import { useCurrentUser } from '../../hooks/useCurrentUser'

export function Cards ({ cards, search }) {
  const { currentUser } = useCurrentUser()

  if (!currentUser?.username) {
    return (
      <section className='cards-container'>
        <div className='card-empty'>
          <h2 className='card-empty-title'>
            To add a new card you must log in
          </h2>
          <Link className='btn-add-new-card' to='/login'>
            Go to log in
          </Link>
        </div>
      </section>
    )
  }

  if (cards.length === 0 && search !== '') return <p className='no-matches'>Results no found for this cityname</p>

  if (cards.length === 0) {
    return (
      <section className='cards-container'>
        <div className='card-empty'>
          <h2 className='card-empty-title'>There are not cards yet</h2>
          <Link className='btn-add-new-card' to='/weather-card/add'>
            Add new card
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className='cards-container'>
      {cards.map((card) => <Card key={card.id} card={card} />)}
    </section>
  )
}
