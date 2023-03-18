import { useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

type Props = {}

const Home = (props: Props) => {
    const { isLoading, data, isError } = useQuery('users', async () => {
        const foundUsers = await axios('https://randomuser.me/api/?results=10')
        return foundUsers.data.results
    })

    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data])

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>something happened.</div>

    return <div>Home</div>
}

export default Home
