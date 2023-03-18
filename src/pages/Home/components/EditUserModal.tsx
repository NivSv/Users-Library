import ModalWrapper from '@/components/ModalWrapper'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useRef, useState } from 'react'
import { updateUser } from '@/redux/usersSlice'
import { TextField, Typography } from '@mui/material'
import { User } from '@/interfaces/user.interface'
import { z, ZodError } from 'zod'
import { hasZodIssue } from '../../../utils/zod.utils'
interface Props {
    isOpen: boolean
    handleClose: () => void
    user: User
}

const EditUserModal = (props: Props) => {
    const users = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch()
    const [error, setError] = useState<ZodError | null>(null)
    const name = useRef<HTMLInputElement>()
    const email = useRef<HTMLInputElement>()
    const location = useRef<HTMLInputElement>()

    const editUserSchema = z.object({
        name: z.string().min(3),
        email: z
            .string()
            .email()
            .refine((email) => {
                return (
                    !users.find((user) => user.email === email) ||
                    email === props.user.email
                )
            }, 'Email already exists'),
        location: z.string().nonempty(),
    })

    const handleSave = () => {
        setError(null)
        const result = editUserSchema.safeParse({
            name: name.current?.value ?? '',
            email: email.current?.value ?? '',
            location: location.current?.value ?? '',
        })
        if (!result.success) {
            setError(result.error)
            return
        }
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
                        error={hasZodIssue(error, 'name')}
                        defaultValue={props.user.name}
                    />
                    <TextField
                        inputRef={email}
                        variant="standard"
                        type={'email'}
                        label="Email"
                        error={hasZodIssue(error, 'email')}
                        defaultValue={props.user.email}
                    />
                    <TextField
                        inputRef={location}
                        variant="standard"
                        label="Location"
                        error={hasZodIssue(error, 'location')}
                        defaultValue={props.user.location}
                    />
                </div>
                {error && (
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, mb: 2, color: 'red' }}
                    >
                        {error.issues[0].message}
                    </Typography>
                )}
            </div>
        </ModalWrapper>
    )
}

export default EditUserModal
