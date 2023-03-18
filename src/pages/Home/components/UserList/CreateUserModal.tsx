import ModalWrapper from '@/components/ModalWrapper'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useRef, useState } from 'react'
import { addUser } from '../../../../redux/usersSlice'
import { v4 as uuidv4 } from 'uuid'
import { TextField, Typography } from '@mui/material'
import { z, ZodError } from 'zod'
import { hasZodIssue } from '@/utils/zod.utils'
import { SnackbarWrapper } from '../../../../components/SnackbarWrapper'

interface Props {
    isOpen: boolean
    handleClose: () => void
}

const CreateUserModal = (props: Props) => {
    const usersSlice = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch()
    const [created, setCreated] = useState(false)
    const [error, setError] = useState<ZodError | null>(null)
    const name = useRef<HTMLInputElement>()
    const email = useRef<HTMLInputElement>()
    const location = useRef<HTMLInputElement>()

    const createUserSchema = z.object({
        name: z.string().min(3),
        email: z
            .string()
            .email()
            .refine((email) => {
                return !usersSlice.users.find((user) => user.email === email)
            }, 'Email already exists'),
        location: z.string().nonempty(),
    })

    const handleSave = () => {
        setError(null)
        const result = createUserSchema.safeParse({
            name: name.current?.value ?? '',
            email: email.current?.value ?? '',
            location: location.current?.value ?? '',
        })
        if (!result.success) {
            setError(result.error)
            return
        }
        dispatch(
            addUser({
                id: uuidv4(),
                name: name.current?.value ?? '',
                email: email.current?.value ?? '',
                location: location.current?.value ?? '',
                image: 'https://xsgames.co/randomusers/avatar.php?g=male',
            })
        )
        setCreated(true)
        props.handleClose()
    }

    return (
        <>
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
                            error={hasZodIssue(error, 'name')}
                        />
                        <TextField
                            inputRef={email}
                            variant="standard"
                            type={'email'}
                            label="Email"
                            error={hasZodIssue(error, 'email')}
                        />
                        <TextField
                            inputRef={location}
                            variant="standard"
                            label="Location"
                            error={hasZodIssue(error, 'location')}
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
            <SnackbarWrapper
                close={() => setCreated(false)}
                open={created}
                message="User created successfully!"
                severity="success"
            />
        </>
    )
}

export default CreateUserModal
