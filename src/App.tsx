import { createTheme, ThemeProvider } from '@mui/material'
import Home from '@/pages/Home/Home'
import { green } from '@mui/material/colors'

const theme = createTheme({
    typography: {
        fontFamily: 'Lato',
    },
    palette: {
        primary: {
            main: '#865DFF',
        },
        secondary: {
            main: '#191825',
        },
        success: {
            main: green[600],
        },
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    )
}

export default App
