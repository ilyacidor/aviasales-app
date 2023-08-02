import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filtersData: [
      { id: 0, text: 'Все', check: true, focus: false },
      { id: 1, text: 'Без пересадок', check: true, focus: false },
      { id: 2, text: '1 Пересадка', check: true, focus: false },
      { id: 3, text: '2 Пересадки', check: true, focus: false },
      { id: 4, text: '3 Пересадки', check: true, focus: false },
    ],
  },
  reducers: {
    changeCheckState(state, action) {
      let newArray = state.filtersData
      const index = action.payload
      if (!index)
        newArray =
          newArray[0].check === true
            ? newArray.map((el) => ({ ...el, check: false }))
            : newArray.map((el) => ({ ...el, check: true }))
      else {
        newArray[index].check = !newArray[index].check
        newArray[0].check = newArray[index].check ? newArray[0].check : false
      }
      if (newArray[1].check && newArray[2].check && newArray[3].check && newArray[4].check) newArray[0].check = true
      state.filtersData = newArray
    },
    changeFocusState(state, action) {
      const index = action.payload
      let newArray = state.filtersData
      newArray[index].focus = !newArray[index].focus
      state.filtersData = newArray
    },
  },
})

export const { changeCheckState, changeFocusState } = filtersSlice.actions

export default filtersSlice.reducer
