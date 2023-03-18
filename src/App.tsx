import { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { useQuery } from 'react-query'
import Home from '@/pages/Home/Home'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { User } from '@/interfaces/user.interface'
import { setUsers } from '@/redux/usersSlice'
import { green } from '@mui/material/colors'
import { fetchUsers } from './api/fetchUsers.api'

const theme = createTheme({
    typography: {
        fontFamily: 'Lato',
    },
    palette: {
        primary: {
            main: '#865DFF',
        },
        secondary: {
            main: '#191825',
        },
        success: {
            main: green[600],
        },
    },
})

function App() {
    const users = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch()
    const { data } = useQuery('users', fetchUsers)

    useEffect(() => {
        if (data && users.length === 0) {
            const newUsers: Array<User> = data.map((foundUser) => {
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
