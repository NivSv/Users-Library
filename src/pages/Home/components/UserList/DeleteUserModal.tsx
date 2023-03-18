import ModalWrapper from '@/components/ModalWrapper'
import { useAppDispatch } from '@/hooks/redux'
import { deleteUser, User } from '@/redux/usersSlice'
import { Typography } from '@mui/material'
import { useState } from 'react'
import { SnackbarWrapper } from '../../../../components/SnackbarWrapper'

interface Props {
    user: User
    isOpen: boolean
    handleClose: () => void
}

const DeleteUserModal = (props: Props) => {
    const [deleted, setDeleted] = useState(false)
    const dispatch = useAppDispatch()

    const handleClicked = () => {
        dispatch(deleteUser(props.user.id))
        setDeleted(true)
    }

    return (
        <>
            <ModalWrapper
                isOpen={props.isOpen}
                buttons={[
                    {
                        text: 'Delete',
                        onClick: handleClicked,
                        color: 'error',
                    },
                ]}
                title="Create User"
                handleClose={props.handleClose}
            >
                <div>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ mb: 2 }}
                    >
                        Are you sure you want to delete {props.user.name}?
                    </Typography>
                </div>
            </ModalWrapper>
            <SnackbarWrapper
                close={() => setDeleted(false)}
                open={deleted}
                message="User deleted successfully!"
                severity="success"
            />
        </>
    )
}

export default DeleteUserModal
