import { TableCell, TableHead, TableRow } from '@mui/material'

const UserListHead = () => {
    return (
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
    )
}

export default UserListHead
