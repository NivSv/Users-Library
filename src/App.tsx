import { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'
import Home from './pages/Home'
import { useAppDispatch } from './hooks/redux'
import { User } from './interfaces/user.interface'
import { setUsers } from './redux/usersSlice'

const theme = createTheme({
    typography: {
        fontFamily: 'Assistant',
    },
    palette: {
        primary: {
            main: '#747274',
        },
    },
})

function App() {
    const dispatch = useAppDispatch()
    const { isLoading, data, isError } = useQuery('users', async () => {
        const foundUsers = await axios('https://randomuser.me/api/?results=10')
        return foundUsers.data.results
    })

    useEffect(() => {
        if (data) {
            const newUsers: Array<User> = data.map((foundUser: any) => {
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
        return () => {
            dispatch(setUsers([]))
        }
    }, [data])

    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    )
}

export default App
