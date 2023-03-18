import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '@/hooks/redux'
import DeleteUserModal from '@/pages/Home/components/DeleteUserModal'
import { useState } from 'react'
import EditUserModal from '@/pages/Home/components/EditUserModal'
import MenuListWrapper from '@/components/MenuListWrapper'

interface Props {
    filter: string
}

const boxSX = {
    '&:hover': {
        color: 'gray',
        backgroundColor: '#e2dadb',
    },
}

const UsersList = (props: Props) => {
    const users = useAppSelector((state) => state.users)
    const [selectedDeleteUser, setSelectedDeleteUser] = useState<string>('')
    const [selectedEditUser, setSelectedEditUser] = useState<string>('')

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Image</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users
                        .filter((user) => {
                            if (props.filter === '') return true
                            if (
                                user.id.toLowerCase().includes(props.filter) ||
                                user.name
                                    .toLowerCase()
                                    .includes(props.filter) ||
                                user.email
                                    .toLowerCase()
                                    .includes(props.filter) ||
                                user.location
                                    .toLowerCase()
                                    .includes(props.filter)
                            )
                                return true
                            return false
                        })
                        .map((user) => (
                            <TableRow key={user.id} sx={boxSX}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {user.id}
                                </TableCell>
                                <TableCell align="center">
                                    <img
                                        width={70}
                                        src={user.image}
                                        title={user.name + ' image'}
                                        alt={user.name + ' image'}
                                    />
                                </TableCell>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {user.name}
                                </TableCell>
                                <TableCell align="center">
                                    {user.email}
                                </TableCell>
                                <TableCell align="center">
                                    {user.location}
                                </TableCell>
                                <TableCell align="center">
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '3px',
                                        }}
                                    >
                                        <MenuListWrapper
                                            title="Actions"
                                            menuList={[
                                                {
                                                    title: 'Edit',
                                                    onClick: () =>
                                                        setSelectedEditUser(
                                                            user.id
                                                        ),
                                                },
                                                {
                                                    title: 'Delete',
                                                    onClick: () =>
                                                        setSelectedDeleteUser(
                                                            user.id
                                                        ),
                                                },
                                            ]}
                                        />
                                        {/* <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                                setSelectedEditUser(user.id)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() =>
                                                setSelectedDeleteUser(user.id)
                                            }
                                        >
                                            Delete
                                        </Button> */}
                                        <DeleteUserModal
                                            isOpen={
                                                selectedDeleteUser === user.id
                                            }
                                            user={user}
                                            handleClose={() =>
                                                setSelectedDeleteUser('')
                                            }
                                        />
                                        <EditUserModal
                                            isOpen={
                                                selectedEditUser === user.id
                                            }
                                            user={user}
                                            handleClose={() =>
                                                setSelectedEditUser('')
                                            }
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UsersList
