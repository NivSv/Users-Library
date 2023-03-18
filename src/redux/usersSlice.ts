import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/interfaces/user.interface'
import { AppDispatch } from './store'
import { fetchUsers } from '../api/fetchUsers.api'

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

// Thunk function
export async function InitUsers(dispatch: AppDispatch) {
    const response = await fetchUsers()
    const newUsers: Array<User> = response.map((foundUser) => {
        return {
            id: foundUser.login.uuid,
            name: `${foundUser.name.first} ${foundUser.name.last}`,
            email: foundUser.email,
            image: foundUser.picture.medium,
            location: `${foundUser.location.country}, ${foundUser.location.city}, ${foundUser.location.street.name} ${foundUser.location.street.number}`,
        }
    })
    dispatch(setUsers(newUsers))
}

export default usersSlice.reducer
