import React from 'react'
import { useSelector } from 'react-redux'

import Filter from '../filter'

import styles from './filters-list.module.scss'

const FiltersList = () => {
  const filtersData = useSelector((state) => state.filtersData.filtersData)
  let elements = filtersData.map((item) => {
    const { ...itemProps } = item
    const { id } = itemProps
    return <Filter key={id} {...itemProps} />
  })
  return (
    <div className={styles.filters}>
      <h2 className={styles['filters__title']}>КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
      <ul className={styles['filters__list']}>{elements}</ul>
    </div>
  )
}

export default FiltersList
