import { useState } from 'react'
import Container from '@mui/material/Container'
import { Button, TextField } from '@mui/material'
import UsersList from '../components/UserList'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'
import CreateUserModal from '../components/CreateUserModal'

const Home = () => {
    const [addUserModal, setAddUserModal] = useState<boolean>(false)
    const [filter, setFilter] = useState<string>('')

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
                Users Library
            </motion.h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
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
                        onClick={() => {
                            setAddUserModal(!addUserModal)
                        }}
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
                        onChange={(e) => {
                            setFilter(e.target.value)
                        }}
                    />
                </motion.div>
            </div>
            <UsersList filter={filter} />
            <CreateUserModal
                isOpen={addUserModal}
                handleClose={() => {
                    setAddUserModal(!addUserModal)
                }}
            />
        </Container>
    )
}

export default Home
