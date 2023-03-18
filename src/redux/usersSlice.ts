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
        deleteUser: (state, action: PayloadAction<string>) => {
            return state.filter((user) => user.id !== action.payload)
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.findIndex(
                (user) => user.id === action.payload.id
            )
            if (index !== -1) {
                state[index] = action.payload
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUsers, addUser, deleteUser, updateUser } = usersSlice.actions

export default usersSlice.reducer
