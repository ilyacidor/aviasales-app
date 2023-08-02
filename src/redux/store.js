import { configureStore } from '@reduxjs/toolkit'

import sortingSlice from './sorting-slice'
import filtersSlice from './filters-slice'
import ticketsSlice from './tickets-slice'

export default configureStore({
  reducer: {
    sortingData: sortingSlice,
    filtersData: filtersSlice,
    tickets: ticketsSlice,
  },
})
