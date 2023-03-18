import { Alert, Snackbar } from '@mui/material'

interface Props {
    open: boolean
    severity: 'error' | 'success' | 'info' | 'warning'
    message: string
    close: () => void
}

export const SnackbarWrapper = ({ open, message, severity, close }: Props) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={close}>
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    )
}
