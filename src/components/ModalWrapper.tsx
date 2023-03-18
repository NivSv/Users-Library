import { Modal } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface ModalButton {
    text: string
    onClick: () => void
    color: 'primary' | 'secondary' | 'error'
}

interface Props {
    isOpen: boolean
    handleClose: () => void
    children: React.ReactNode
    title: string
    buttons: Array<ModalButton>
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

const ModalWrapper = (props: Props) => {
    return (
        <Modal
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.title}
                </Typography>
                {props.children}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {props.buttons.map((button, index) => (
                        <Button
                            key={index}
                            onClick={button.onClick}
                            onKeyDown={button.onClick}
                            variant="contained"
                            color={button.color}
                        >
                            <Typography>{button.text}</Typography>
                        </Button>
                    ))}
                    <Button
                        onClick={props.handleClose}
                        onKeyDown={props.handleClose}
                        variant="outlined"
                        color="secondary"
                    >
                        <Typography>Cancel</Typography>
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalWrapper
