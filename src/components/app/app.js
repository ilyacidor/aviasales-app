import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addShowingTickets, fetchSearchId, fetchTickets } from '../../redux/tickets-slice'
import logo from '../../images/logo.png'
import FiltersList from '../filters-list'
import Sorting from '../sorting'
import TicketsList from '../tickets-list'

import styles from './app.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const viewTickets = () => dispatch(addShowingTickets())
  const searchId = useSelector((state) => state.tickets.searchId)
  const tickets = useSelector((state) => state.tickets.tickets)
  const stop = useSelector((state) => state.tickets.stop)
  const error = useSelector((state) => state.tickets.error)
  useEffect(() => {
    dispatch(fetchSearchId())
  }, [])
  useEffect(() => {
    if (searchId && !stop) {
      dispatch(fetchTickets(searchId))
    }
  }, [searchId, tickets, error])
  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <img src={logo} className={styles['header-picture']} alt="aviasales" width="90px" height="90px" />
      </header>
      <main className={styles['main-content']}>
        <FiltersList />
        <div className={styles['tickets-content']}>
          <Sorting />
          <TicketsList />
          <button className={styles.button} onClick={viewTickets}>
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
