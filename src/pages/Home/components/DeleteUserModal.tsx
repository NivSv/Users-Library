import ModalWrapper from '@/components/ModalWrapper'
import { useAppDispatch } from '@/hooks/redux'
import { User } from '@/interfaces/user.interface'
import { deleteUser } from '@/redux/usersSlice'
import { Typography } from '@mui/material'

interface Props {
    user: User
    isOpen: boolean
    handleClose: () => void
}

const DeleteUserModal = (props: Props) => {
    const dispatch = useAppDispatch()

    const handleClicked = () => {
        dispatch(deleteUser(props.user.id))
    }

    return (
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
    )
}

export default DeleteUserModal
