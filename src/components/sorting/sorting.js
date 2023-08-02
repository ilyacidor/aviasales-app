import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { changeSortingData } from '../../redux/sorting-slice'

import styles from './sorting.module.scss'

const Sorting = () => {
  const sortingData = useSelector((state) => state.sortingData.sortingData)
  const dispatch = useDispatch()
  const changeCheck = () => dispatch(changeSortingData())
  return (
    <div className={styles.sorting}>
      <label className={styles.radio}>
        <input
          type="radio"
          className={styles['radio__input']}
          name="radio"
          checked={sortingData[0]}
          onChange={changeCheck}
        />
        <div
          className={
            sortingData[0] ? `${styles['sorting__text']} ${styles['sorting__text--checked']}` : styles['sorting__text']
          }
        >
          САМЫЙ ДЕШЕВЫЙ
        </div>
      </label>
      <label className={styles.radio}>
        <input
          type="radio"
          className={styles['radio__input']}
          name="radio"
          checked={sortingData[1]}
          onChange={changeCheck}
        />
        <div
          className={
            sortingData[1] ? `${styles['sorting__text']} ${styles['sorting__text--checked']}` : styles['sorting__text']
          }
        >
          САМЫЙ БЫСТРЫЙ
        </div>
      </label>
    </div>
  )
}

export default Sorting
