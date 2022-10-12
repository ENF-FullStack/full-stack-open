import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterOut(state = initialState, action) {
            const content = action.payload
            return content
        }
    }
})

export const { filterOut } = filterSlice.actions
export default filterSlice.reducer