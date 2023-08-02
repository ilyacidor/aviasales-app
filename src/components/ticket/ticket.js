import React from 'react'

import styles from './ticket.module.scss'

const Ticket = ({ price, carrier, segments }) => {
  const correctStopsNumber = (stops) => {
    if (!stops) return 'БЕЗ ПЕРЕСАДОК'
    if (stops === 1) return '1 ПЕРЕСАДКА'
    else return stops + ' ПЕРЕСАДКИ'
  }
  const correctDuration = (duration) => {
    const hours = Math.floor(duration / 60)
    return hours + 'ч ' + (duration - hours * 60) + 'm'
  }
  const correctStops = (stops) => {
    return String(stops).replace(/,/gi, ', ')
  }
  const correctTime = (time, duration) => {
    const newTime = time.slice(11, 16)
    let secondTime = newTime.slice(0, 2) * 60 + Number(newTime.slice(3, 5)) + duration
    if (secondTime > 1439) secondTime -= 1440
    let hours = Math.floor(secondTime / 60)
    let minutes = secondTime - hours * 60
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    secondTime = hours + ':' + minutes
    return newTime + ' - ' + secondTime
  }
  const fullCarrierLink = `https://pics.avs.io/99/36/${carrier}.png`
  return (
    <div className={styles.ticket}>
      <div className={styles['ticket__header']}>
        <span className={styles.price}>{price} P</span>
        <img className={styles.carrier} src={fullCarrierLink} alt={carrier}></img>
      </div>
      <ul className={styles['ticket__list']}>
        <li className={styles['ticket__item']}>
          <span className={styles['ticket__options']}>
            {segments[0].origin} – {segments[0].destination}
          </span>
          <span className={styles['ticket__info']}>{correctTime(segments[0].date, segments[0].duration)}</span>
        </li>
        <li className={styles['ticket__item']}>
          <span className={styles['ticket__options']}>В ПУТИ</span>
          <span className={styles['ticket__info']}>{correctDuration(segments[0].duration)}</span>
        </li>
        <li className={styles['ticket__item']}>
          <span className={styles['ticket__options']}>{correctStopsNumber(segments[0].stops.length)}</span>
          <span className={styles['ticket__info']}>{correctStops(segments[0].stops)}</span>
        </li>
        <li className={styles['ticket__item']}>
          <span className={styles['ticket__options']}>
            {segments[1].origin} – {segments[1].destination}
          </span>
          <span className={styles['ticket__info']}>{correctTime(segments[1].date, segments[1].duration)}</span>
        </li>
        <li className={styles['ticket__item']}>
          <span className={styles['ticket__options']}>В ПУТИ</span>
          <span className={styles['ticket__info']}>{correctDuration(segments[1].duration)}</span>
        </li>
        <li className={styles['ticket__item']}>
          <span className={styles['ticket__options']}>{correctStopsNumber(segments[1].stops.length)}</span>
          <span className={styles['ticket__info']}>{correctStops(segments[1].stops)}</span>
        </li>
      </ul>
    </div>
  )
}

export default Ticket
