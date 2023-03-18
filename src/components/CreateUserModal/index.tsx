import { Modal, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface Props {
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

const CreateUserModal = (props: Props) => {
    return (
        <Modal
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create User Modal
                </Typography>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginBottom: '1rem',
                    }}
                >
                    <TextField variant="standard" label="Name" />
                    <TextField variant="standard" label="Email" />
                    <TextField variant="standard" label="Location" />
                    <TextField variant="standard" label="Image" />
                </div>
                <Button variant="contained" color="success">
                    <Typography>Create User</Typography>
                </Button>
            </Box>
        </Modal>
    )
}

export default CreateUserModal
