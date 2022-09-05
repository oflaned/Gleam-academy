import bcrypt from 'bcrypt'

export const users = [
    {
        email: 'user@books.com',
        password:
            '$2b$10$OR9lyeJ/0tG5JjWeYjz.a.hWZCSPryjhNbB3V0xKupEFf2wPZPzXi',
        id: 0,
        name: 'user_0',
    },
]

export async function register(user) {
    user.name = 'user_' + users.length
    user.id = users.length
    user.password = await bcrypt.hash(user.password, 10)
    users.push(user)
    return user.email
}
