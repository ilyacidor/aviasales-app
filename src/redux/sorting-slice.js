import { createSlice } from '@reduxjs/toolkit'

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    sortingData: [true, false],
  },
  reducers: {
    changeSortingData(state) {
      state.sortingData = [state.sortingData[1], state.sortingData[0]]
    },
  },
})

export const { changeSortingData } = sortingSlice.actions

export default sortingSlice.reducer
