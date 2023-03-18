import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import UserListHead from './UserListHead'
import UserListRow from './UserListRow'
import UserListRowSkeleton from './UserListRowSkeleton'
import { SnackbarWrapper } from '../../../../components/SnackbarWrapper'
import { setStatus } from '../../../../redux/usersSlice'

interface Props {
    filter: string
}

const UsersList = (props: Props) => {
    const usersSlice = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch()

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
                        {usersSlice.status === 'loading'
                            ? Array.from({ length: 6 }, (_, i) => (
                                  <UserListRowSkeleton key={i} />
                              ))
                            : usersSlice.users
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
            <SnackbarWrapper
                close={() => {
                    dispatch(setStatus('idle'))
                }}
                open={usersSlice.status === 'failed' ? true : false}
                message="Encounter an error, please try again later!"
                severity="error"
            />
        </>
    )
}

export default UsersList
