import axios from 'axios'
import { z } from 'zod'

const UserResponseSchema = z.object({
    results: z
        .object({
            gender: z.string(),
            name: z.object({
                title: z.string(),
                first: z.string(),
                last: z.string(),
            }),
            location: z.object({
                street: z.object({
                    number: z.number(),
                    name: z.string(),
                }),
                city: z.string(),
                state: z.string(),
                country: z.string(),
                postcode: z.number(),
                coordinates: z.object({
                    latitude: z.number(),
                    longitude: z.number(),
                }),
                timezone: z.object({
                    offset: z.string(),
                    description: z.string(),
                }),
            }),
            email: z.string().email(),
            login: z.object({
                uuid: z.string(),
                username: z.string(),
                password: z.string(),
                salt: z.string(),
                md5: z.string(),
                sha1: z.string(),
                sha256: z.string(),
            }),
            dob: z.object({
                date: z.string(),
                age: z.number(),
            }),
            registered: z.object({
                date: z.string(),
                age: z.number(),
            }),
            phone: z.string(),
            cell: z.string(),
            id: z.object({
                name: z.string(),
                value: z.string(),
            }),
            picture: z.object({
                large: z.string(),
                medium: z.string(),
                thumbnail: z.string(),
            }),
            nat: z.string(),
        })
        .array(),
})

type UserResponse = z.infer<typeof UserResponseSchema>

export const fetchUsers = async () => {
    const foundUsers = await axios<UserResponse>(
        'https://randomuser.me/api/?results=10'
    )

    return foundUsers.data.results
}
