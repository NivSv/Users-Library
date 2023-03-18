import { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { useQuery } from 'react-query'
import axios from 'axios'
import Home from './pages/Home'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { User } from './interfaces/user.interface'
import { setUsers } from './redux/usersSlice'
import { green } from '@mui/material/colors'

const theme = createTheme({
    typography: {
        fontFamily: 'Lato',
    },
    palette: {
        primary: {
            main: '#747274',
        },
        success: {
            main: green[600],
        },
    },
})

function App() {
    const users = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch()
    const { data, isError } = useQuery('users', async () => {
        const foundUsers = await axios('https://randomuser.me/api/?results=10')
        return foundUsers.data.results
    })

    useEffect(() => {
        if (data && users.length === 0) {
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
    }, [data])

    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    )
}

export default App
