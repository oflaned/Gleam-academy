export const checkEmail = {
    email: {
        in: ['body'],
        isEmail: true,
        isLength: {
            options: { min: 1, max: 50 },
        },
    },
}

export const checkPassword = {
    password: {
        in: ['body'],
        isLength: {
            options: { min: 1, max: 50 },
        },
    },
}
