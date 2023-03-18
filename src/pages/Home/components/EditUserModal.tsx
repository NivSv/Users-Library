import ModalWrapper from '@/components/ModalWrapper'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useRef, useState } from 'react'
import { ErrorType } from '@/interfaces/error.interface'
import { updateUser } from '@/redux/usersSlice'
import { TextField, Typography } from '@mui/material'
import { User } from '@/interfaces/user.interface'

interface Props {
    isOpen: boolean
    handleClose: () => void
    user: User
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
            </div>
        </ModalWrapper>
    )
}

export default EditUserModal
