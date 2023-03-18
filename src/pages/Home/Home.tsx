import { useState } from 'react'
import Container from '@mui/material/Container'
import UsersList from '@/pages/Home/components/UserList/UserList'
import CreateUserModal from '@/pages/Home/components/CreateUserModal'
import Header from './components/Header'

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
            <Header
                setAddUserModal={setAddUserModal}
                setFilter={setFilter}
                addUserModal={addUserModal}
            />
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
