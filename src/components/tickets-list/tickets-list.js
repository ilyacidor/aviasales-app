import React from 'react'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'

import Ticket from '../ticket/ticket'

import styles from './tickets-list.module.scss'

const TicketsList = () => {
  const numberOfShowingTickets = useSelector((state) => state.tickets.showingTickets)
  let tickets = useSelector((state) => state.tickets.tickets)
  tickets = [...tickets]
  const sortingData = useSelector((state) => state.sortingData.sortingData)
  const filtersData = useSelector((state) => state.filtersData.filtersData)
  const notCheckedFilters = filtersData.filter((el) => !el.check)
  if (tickets.length && sortingData[0]) {
    tickets.sort((a, b) => a.price - b.price)
  }
  if (tickets.length && sortingData[1]) {
    tickets.sort(
      (a, b) =>
        Math.min(a.segments[0].duration, a.segments[1].duration) -
        Math.min(b.segments[0].duration, b.segments[1].duration)
    )
  }
  if (notCheckedFilters.length && tickets.length) {
    let ids = notCheckedFilters.map((el) => el.id)
    for (let i = 1; i < ids.length; i++) {
      tickets = tickets.filter((el) => el.segments[0].stops.length !== ids[i] - 1)
      tickets = tickets.filter((el) => el.segments[1].stops.length !== ids[i] - 1)
    }
  }
  tickets = tickets.slice(0, numberOfShowingTickets)
  const elements = tickets.map((item) => {
    const { ...itemProps } = item
    const { id } = itemProps
    return (
      <li className={styles['tickets__item']} key={id}>
        <Ticket {...itemProps} />
      </li>
    )
  })
  const stop = useSelector((state) => state.tickets.stop)
  const spin = !stop ? (
    <div className={styles.spin}>
      <Spin size="large" />
      <p className={styles['spin__text']}>Поиск билетов...</p>
    </div>
  ) : null
  const content = elements.length ? (
    elements
  ) : (
    <p className={styles['tickets__error']}>Рейсов, подходящих под заданные фильтры, не найдено</p>
  )

  return (
    <ul className={styles['tickets__list']}>
      {spin}
      {content}
    </ul>
  )
}

export default TicketsList
