import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages/Home'

// Create a client
const queryClient = new QueryClient()

const theme = createTheme({
    typography: {
        fontFamily: 'Assistant',
    },
    palette: {
        primary: {
            main: '#747274',
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Home />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
