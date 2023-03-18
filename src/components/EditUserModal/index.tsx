import { Modal, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { updateUser } from '../../redux/usersSlice'
import { useRef, useState } from 'react'
import { User } from '../../interfaces/user.interface'

interface Props {
    isOpen: boolean
    user: User
    handleClose: () => void
}

interface ErrorType {
    ErrorType: 'name' | 'email' | 'location' | 'image' | null
    message: string
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

const EditUserModal = (props: Props) => {
    const users = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch()
    const [error, setError] = useState<ErrorType>({
        ErrorType: null,
        message: '',
    })
    const name = useRef<HTMLInputElement>()
    const email = useRef<HTMLInputElement>()
    const location = useRef<HTMLInputElement>()

    const handleSave = () => {
        const emailTest =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if ((name.current?.value.length ?? 0) < 3) {
            setError({
                ErrorType: 'name',
                message: 'Name is required min 3 characters',
            })
            return
        }
        if (!emailTest.test(email.current?.value ?? '')) {
            setError({
                ErrorType: 'email',
                message: 'Email is required',
            })
            return
        }
        if (!location.current?.value) {
            setError({
                ErrorType: 'location',
                message: 'Location is required',
            })
            return
        }
        if (
            users.find(
                (user) =>
                    user.email === email.current?.value &&
                    user.id !== props.user.id
            )
        ) {
            setError({
                ErrorType: 'email',
                message: 'Email already exists in the list',
            })
            return
        }
        setError({
            ErrorType: null,
            message: '',
        })
        dispatch(
            updateUser({
                id: props.user.id,
                name: name.current?.value ?? props.user.name,
                email: email.current?.value ?? props.user.email,
                location: location.current?.value ?? props.user.location,
                image: props.user.image,
            })
        )
        props.handleClose()
    }

    return (
        <Modal
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit User
                </Typography>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginBottom: '1rem',
                    }}
                >
                    <TextField
                        inputRef={name}
                        variant="standard"
                        label="Name"
                        error={error.ErrorType === 'name'}
                        defaultValue={props.user.name}
                    />
                    <TextField
                        inputRef={email}
                        variant="standard"
                        type={'email'}
                        label="Email"
                        error={error.ErrorType === 'email'}
                        defaultValue={props.user.email}
                    />
                    <TextField
                        inputRef={location}
                        variant="standard"
                        label="Location"
                        error={error.ErrorType === 'location'}
                        defaultValue={props.user.location}
                    />
                </div>
                {error.ErrorType && (
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, mb: 2, color: 'red' }}
                    >
                        {error.message}
                    </Typography>
                )}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                        onClick={handleSave}
                        onKeyDown={handleSave}
                        variant="contained"
                        color="success"
                    >
                        <Typography>Apply</Typography>
                    </Button>
                    <Button
                        onClick={props.handleClose}
                        onKeyDown={props.handleClose}
                        variant="contained"
                        color="warning"
                    >
                        <Typography>Cancel</Typography>
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default EditUserModal
