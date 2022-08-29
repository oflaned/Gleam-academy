import bcrypt from 'bcrypt'

export const users = [
    {
        email: "user@books.com",
        password: "$2b$10$OR9lyeJ/0tG5JjWeYjz.a.hWZCSPryjhNbB3V0xKupEFf2wPZPzXi",
        id: 0,
        name: "user"
    }
]

export async function register(user) {

    user.name = "user"+ users.length
    user.id = users.length
    console.log(user.password)
    console.log(await bcrypt.hash(user.password, 10))
    user.password = await bcrypt.hash(user.password, 10)
    users.push(user)
    return user.email
}