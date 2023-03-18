import { Skeleton, TableCell, TableRow } from '@mui/material'

const boxSX = {
    '&:hover': {
        color: 'gray',
        backgroundColor: '#e2dadb',
    },
}

const UserListRowSkeleton = () => {
    return (
        <TableRow sx={boxSX}>
            <TableCell component="th" scope="row" align="center">
                <Skeleton variant="text" />
            </TableCell>
            <TableCell align="center">
                <Skeleton variant="rounded" width={70} height={70} />
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                <Skeleton variant="text" />
            </TableCell>
            <TableCell align="center">
                <Skeleton variant="text" />
            </TableCell>
            <TableCell align="center">
                <Skeleton variant="text" />
            </TableCell>
            <TableCell align="center">
                <Skeleton variant="rectangular" height={30} />
            </TableCell>
        </TableRow>
    )
}

export default UserListRowSkeleton
