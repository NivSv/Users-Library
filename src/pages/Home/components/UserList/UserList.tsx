import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '@/hooks/redux'
import UserListHead from './UserListHead'
import UserListRow from './UserListRow'
import { Alert, Snackbar } from '@mui/material'
import UserListRowSkeleton from './UserListRowSkeleton'

interface Props {
    filter: string
}

const UsersList = (props: Props) => {
    const usersSlice = useAppSelector((state) => state.users)

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
                        {usersSlice.status === 'loading' ? (
                            <>
                                <UserListRowSkeleton />
                                <UserListRowSkeleton />
                                <UserListRowSkeleton />
                                <UserListRowSkeleton />
                                <UserListRowSkeleton />
                            </>
                        ) : (
                            usersSlice.users
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
                                ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={usersSlice.status === 'failed' ? true : false}
                autoHideDuration={6000}
            >
                <Alert severity="error">
                    Encounter an error, please try again later!
                </Alert>
            </Snackbar>
        </>
    )
}

export default UsersList
