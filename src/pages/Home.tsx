import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import setUsers from '../redux/usersSlice'
import { User } from '../interfaces/user.interface'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import Container from '@mui/material/Container'
import { Button, TextField } from '@mui/material'
import UsersList from '../components/UsersList'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'

type Props = {}

const Home = (props: Props) => {
    // const users = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch()
    const { isLoading, data, isError } = useQuery('users', async () => {
        const foundUsers = await axios('https://randomuser.me/api/?results=10')
        return foundUsers.data.results
    })
    const [users, setUsers] = useState<Array<User>>([])

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
            setUsers(newUsers)
            // dispatch(setUsers(newUsers))
        }
        return () => {}
    }, [data])

    useEffect(() => {
        console.log(users)
    }, [users])

    return (
        <Container
            maxWidth="md"
            sx={{
                backgroundColor: '#f1f1f1',
                boxShadow: '0 10px 30px -10px rgba(2, 12, 27, 0.7)',
                borderRadius: '5px',
                paddingBottom: '2rem',
            }}
        >
            <motion.h1
                initial="hidden"
                whileInView="show"
                variants={textVariant(null)}
                style={{
                    textAlign: 'center',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                User Library
            </motion.h1>
            <div
                style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '2rem',
                }}
            >
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={fadeIn({
                        delay: 0.5,
                        duration: 0.5,
                        direction: 'right',
                        type: 'spring',
                    })}
                >
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ maxHeight: '35px' }}
                    >
                        Add User
                    </Button>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={fadeIn({
                        delay: 0.5,
                        duration: 0.5,
                        direction: 'left',
                        type: 'spring',
                    })}
                >
                    <TextField
                        id="standard-basic"
                        label="Filter"
                        variant="standard"
                    />
                </motion.div>
            </div>
            <UsersList users={users} isLoading={isLoading} />
        </Container>
    )
}

export default Home
