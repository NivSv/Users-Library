import { TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { User } from '@/redux/usersSlice'
import MenuListWrapper from '../../../../components/MenuListWrapper'
import DeleteUserModal from '../DeleteUserModal'
import EditUserModal from '../EditUserModal'

interface Props {
    user: User
}

const boxSX = {
    '&:hover': {
        color: 'gray',
        backgroundColor: '#e2dadb',
    },
}

const UserListRow = ({ user }: Props) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
    return (
        <TableRow key={user.id} sx={boxSX}>
            <TableCell component="th" scope="row" align="center">
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
            <TableCell component="th" scope="row" align="center">
                {user.name}
            </TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">{user.location}</TableCell>
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
                                onClick: () => setEditModalOpen(!editModalOpen),
                            },
                            {
                                title: 'Delete',
                                onClick: () =>
                                    setDeleteModalOpen(!deleteModalOpen),
                            },
                        ]}
                    />
                    <DeleteUserModal
                        isOpen={deleteModalOpen}
                        user={user}
                        handleClose={() => setEditModalOpen(!editModalOpen)}
                    />
                    <EditUserModal
                        isOpen={editModalOpen}
                        user={user}
                        handleClose={() => setEditModalOpen(!editModalOpen)}
                    />
                </div>
            </TableCell>
        </TableRow>
    )
}

export default UserListRow
