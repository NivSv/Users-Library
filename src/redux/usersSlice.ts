import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from './store'
import { fetchUsers } from '../api/fetchUsers.api'
import { z } from 'zod'

const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string(),
    location: z.string(),
})

const UsersSliceSchema = z.object({
    users: z.array(UserSchema),
    status: z.enum(['idle', 'loading', 'succeeded', 'failed']),
    error: z.union([z.unknown(), z.null()]),
})

export type User = z.TypeOf<typeof UserSchema>
export type Status = z.TypeOf<typeof UsersSliceSchema>['status']

const initialState = {
    users: [] as Array<User>,
    status: 'idle',
    error: null,
} as z.infer<typeof UsersSliceSchema>

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<unknown>) => {
            state.error = action.payload
        },
        setStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload
        },
        setUsers: (state, action: PayloadAction<Array<User>>) => {
            state.users = [...action.payload]
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = [
                ...state.users.filter((user) => user.id !== action.payload),
            ]
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(
                (user) => user.id === action.payload.id
            )
            if (index !== -1) {
                state.users[index] = action.payload
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setUsers,
    addUser,
    deleteUser,
    updateUser,
    setStatus,
    setError,
} = usersSlice.actions

// Thunk function
export async function InitUsers(dispatch: AppDispatch) {
    try {
        dispatch(setStatus('loading'))
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
        dispatch(setStatus('succeeded'))
    } catch (error: unknown) {
        dispatch(setError(error))
        dispatch(setStatus('failed'))
    }
}

export default usersSlice.reducer
