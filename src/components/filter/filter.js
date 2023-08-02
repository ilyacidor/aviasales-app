import React from 'react'
import { useDispatch } from 'react-redux'

import { changeCheckState, changeFocusState } from '../../redux/filters-slice'

import styles from './filter.module.scss'

const Filter = ({ id, text, check, focus }) => {
  const dispatch = useDispatch()
  const changeCheck = (index) => {
    dispatch(changeCheckState(index))
  }
  const changeFocus = (index) => {
    dispatch(changeFocusState(index))
  }
  return (
    <li
      className={focus ? `${styles['filter']} ${styles['filter--aimed']}` : styles['filter']}
      onMouseOver={() => changeFocus(id)}
      onMouseOut={() => changeFocus(id)}
    >
      <label className={styles.check}>
        <input type="checkbox" className={styles['check__input']} checked={check} onChange={() => changeCheck(id)} />
        <span className={styles['check__box']}></span>
        {text}
      </label>
    </li>
  )
}

export default Filter
