import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages/Home'

// Create a client
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
    )
}

export default App
