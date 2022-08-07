export const checkId = {
    bookId: {
        in: ['params'],
        isInt: {
            options: { min: 0 }
        },
        toInt: true
    }
}

export const checkFields = {
    title: {
        in: ['body'],
        trim: true,
        isLength: {
            options: { min: 1, max: 100 }
        }
    },
    description: {
        in: ['body'],
        trim: true,
        isLength: {
            options: { min:1, max: 100 }
        }
    },
    price: {
        in: ['body'],
        isInt: {
            options: { min: 0 }
        },
        toInt: true
    }
}

export const checkOptionalFields = {
    title: {
        optional: {options: { nullable: true }},
        in: ['body'],
        trim: true,
        isLength: {
            options: { min: 1, max: 100 }
        }
    },
    description: {
        optional: {options: { nullable: true }},
        in: ['body'],
        trim: true,
        isLength: {
            options: { min:1, max: 100 }
        }
    },
    price: {
        optional: {options: { nullable: true }},
        in: ['body'],
        isInt: {
            options: { min: 0 }
        },
        toInt: true
    }
}
