import { Modal } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useAppDispatch } from '../../hooks/redux'
import { deleteUser } from '../../redux/usersSlice'
import { User } from '../../interfaces/user.interface'

interface Props {
    user: User
    isOpen: boolean
    handleClose: () => void
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '14rem',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

const DeleteUserModal = (props: Props) => {
    const dispatch = useAppDispatch()

    const handleClicked = () => {
        dispatch(deleteUser(props.user.id))
    }

    return (
        <Modal
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ mb: 2 }}
                >
                    Are you sure you want to delete {props.user.name}?
                </Typography>
                <Button
                    onClick={handleClicked}
                    onKeyDown={handleClicked}
                    variant="contained"
                    color="error"
                >
                    <Typography>Delete User</Typography>
                </Button>
            </Box>
        </Modal>
    )
}

export default DeleteUserModal
