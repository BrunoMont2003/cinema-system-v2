import moment from 'moment'
import './style.css'
const Ticket = ({ func, ticket, client }) => {
  console.log(ticket)
  return (
    <div className='ticket scale-75 lg:scale-100'>
      <div className='left'>
        <div
          className='image'
          style={{ backgroundImage: 'url(' + func.movie.poster_path + ')' }}
        >
          <p className='admit-one'>
            <span>ADMIT ONE</span>
            <span>ADMIT ONE</span>
            <span>ADMIT ONE</span>
          </p>
          <div className='ticket-number'>
            <p className='bg-slate-100 bg-opacity-50'>
              #{String(ticket.id).padStart(6, '0')}
            </p>
          </div>
        </div>
        <div className='ticket-info'>
          <p className='date'>
            <span>{moment(func.showtime).format('dddd')}</span>
            <span className='june-29 uppercase'>
              {moment(func.showtime).format('MMM Do')}
            </span>
            <span>{moment(func.showtime).get('year')}</span>
          </p>
          <div className='show-name'>
            <h1>{func.movie.title}</h1>
            <h2>{client.first_name + ' ' + client.last_name}</h2>
          </div>
          <div className='time'>
            <p>
              {moment(func.showtime).format('h:mm A')} <span>TO</span>{' '}
              {moment(func.showtime)
                .add(func.movie.duration, 'minutes')
                .format('h:mm A')}
            </p>
          </div>
          <p className='location'>
            <span className='uppercase'>{func.hall.name}</span>
            <span className='separator'>
              <i className='fa-solid fa-ticket' />
            </span>
            <span>{ticket.seat.row + ticket.seat.column}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Ticket
