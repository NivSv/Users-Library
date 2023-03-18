import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/utils/motion.utils'
import { Button, TextField } from '@mui/material'

interface Props {
    addUserModal: boolean
    setAddUserModal: (value: boolean) => void
    setFilter: (value: string) => void
}

const Header = (props: Props) => {
    return (
        <>
            <motion.h1
                initial="hidden"
                whileInView="show"
                variants={textVariant(null)}
                style={{
                    textAlign: 'center',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                Users Library
            </motion.h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '2rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '2rem',
                }}
            >
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={fadeIn({
                        delay: 0.5,
                        duration: 0.5,
                        direction: 'right',
                        type: 'spring',
                    })}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ maxHeight: '35px' }}
                        onClick={() => {
                            props.setAddUserModal(!props.addUserModal)
                        }}
                    >
                        Add User
                    </Button>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={fadeIn({
                        delay: 0.5,
                        duration: 0.5,
                        direction: 'left',
                        type: 'spring',
                    })}
                >
                    <TextField
                        id="standard-basic"
                        label="Filter"
                        variant="standard"
                        onChange={(e) => {
                            props.setFilter(e.target.value)
                        }}
                    />
                </motion.div>
            </div>
        </>
    )
}

export default Header
