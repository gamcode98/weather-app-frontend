import { Card } from '../Card'
import { Link } from 'react-router-dom'
import './Cards.css'
import { useCurrentUser } from '../../hooks/useCurrentUser'

export function Cards ({ cards, search }) {
  const { currentUser } = useCurrentUser()

  return (
    <section className='cards-container'>
      {!cards.length && search && <p className='no-matches'>No matches</p>}

      {cards.length || search
        ? (
            cards.map((card) => <Card key={card.id} card={card} />)
          )
        : (
          <div className='card-empty'>
            {currentUser?.username
              ? (
                <>
                  <h2 className='card-empty-title'>There are not cards yet</h2>
                  <Link className='btn-add-new-card' to='/weather-card/add'>
                    Add new card
                  </Link>
                </>
                )
              : (
                <>
                  <h2 className='card-empty-title'>
                    To add a new card you must log in
                  </h2>
                  <Link className='btn-add-new-card' to='/login'>
                    Go to log in
                  </Link>
                </>
                )}
          </div>
          )}
    </section>
  )
}
