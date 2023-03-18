import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import { useAppSelector } from '../../hooks/redux'

const UsersList = () => {
    const users = useAppSelector((state) => state.users)
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
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">email</TableCell>
                        <TableCell align="center">location</TableCell>
                        <TableCell align="center">image</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {user.id}
                            </TableCell>
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {user.name}
                            </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">
                                {user.location}
                            </TableCell>
                            <TableCell align="center">
                                <img
                                    src={user.image}
                                    title={user.name + ' image'}
                                    alt={user.name + ' image'}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '3px',
                                    }}
                                >
                                    <Button variant="contained" color="error">
                                        Delete
                                    </Button>
                                    <Button variant="contained" color="info">
                                        Edit
                                    </Button>
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
