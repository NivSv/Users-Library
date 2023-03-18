import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './index.css'
import { InitUsers } from './redux/usersSlice'
// Create a client
// Init users
store.dispatch(InitUsers)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
