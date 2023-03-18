import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '@/hooks/redux'
import { useState } from 'react'
import UserListHead from './UserListHead'
import UserListRow from './UserListRow'
import { Alert, Snackbar } from '@mui/material'

interface Props {
    filter: string
}

const UsersList = (props: Props) => {
    const users = useAppSelector((state) => state.users)

    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                >
                    <UserListHead />
                    <TableBody>
                        {users
                            .filter((user) => {
                                if (props.filter === '') return true
                                if (
                                    user.id
                                        .toLowerCase()
                                        .includes(props.filter) ||
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
                                <UserListRow key={user.id} user={user} />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <Snackbar open={error ? true : false} autoHideDuration={6000}>
                <Alert severity="error">This is an error message!</Alert>
            </Snackbar> */}
        </>
    )
}

export default UsersList
