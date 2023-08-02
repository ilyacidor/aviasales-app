import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async function () {
  const res = await fetch('https://aviasales-test-api.kata.academy/search')
  const obj = await res.json()
  return obj.searchId
})

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async function (id) {
  const tickets = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
  return await tickets.json()
})

let maxId = 1

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    searchId: '',
    showingTickets: 5,
    stop: false,
    status: null,
    error: null,
  },
  reducers: {
    addShowingTickets(state) {
      state.showingTickets += 5
    },
  },
  extraReducers: {
    [fetchSearchId.pending]: (state) => {
      state.status = 'loading searchId'
      state.error = null
    },
    [fetchSearchId.fulfilled]: (state, action) => {
      state.status = 'resolve searchId'
      state.searchId = action.payload
    },
    [fetchSearchId.rejected]: (state) => {
      state.status = 'reject searchId'
      state.error = 'error'
    },
    [fetchTickets.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.status = 'resolve'
      let newArray = state.tickets
      newArray = [...newArray, ...action.payload.tickets.map((el) => ({ ...el, id: maxId++ }))]
      state.tickets = newArray
      state.stop = action.payload.stop
    },
    [fetchTickets.rejected]: (state) => {
      state.status = 'reject'
      state.error = 'error'
    },
  },
})

export const { addShowingTickets } = ticketsSlice.actions

export default ticketsSlice.reducer
