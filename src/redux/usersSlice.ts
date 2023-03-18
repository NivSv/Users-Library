import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../interfaces/user.interface'

const initialState = [] as Array<User>

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<Array<User>>) => {
            return action.payload
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUsers, addUser } = usersSlice.actions

export default usersSlice.reducer
