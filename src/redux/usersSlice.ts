import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../interfaces/user.interface'
import { RootState } from './store'

const initialState: Array<User> = []

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Array<User>>) => {
            return action.payload
        },
    },
})

export const selectUsers = (state: RootState) => state.users

// Action creators are generated for each case reducer function
export const { set } = usersSlice.actions

export default usersSlice.reducer
