import ModalWrapper from '@/components/ModalWrapper'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useRef, useState } from 'react'
import { ErrorType } from '@/interfaces/error.interface'
import { addUser } from '../../../redux/usersSlice'
import { v4 as uuidv4 } from 'uuid'
import { TextField, Typography } from '@mui/material'

interface Props {
    isOpen: boolean
    handleClose: () => void
}

const CreateUserModal = (props: Props) => {
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
        if (users.find((user) => user.email === email.current?.value)) {
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
            addUser({
                id: uuidv4(),
                name: name.current?.value ?? '',
                email: email.current?.value ?? '',
                location: location.current?.value,
                image: 'https://xsgames.co/randomusers/avatar.php?g=male',
            })
        )
        props.handleClose()
    }

    return (
        <ModalWrapper
            isOpen={props.isOpen}
            // eslint-disable-next-line react/no-children-prop
            buttons={[
                {
                    text: 'Save',
                    onClick: handleSave,
                    color: 'primary',
                },
            ]}
            title="Create User"
            handleClose={props.handleClose}
        >
            <div>
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
                    />
                    <TextField
                        inputRef={email}
                        variant="standard"
                        type={'email'}
                        label="Email"
                        error={error.ErrorType === 'email'}
                    />
                    <TextField
                        inputRef={location}
                        variant="standard"
                        label="Location"
                        error={error.ErrorType === 'location'}
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
            </div>
        </ModalWrapper>
    )
}

export default CreateUserModal
