export const badParametr = {
    statusCode: 400,
    message: 'Incorret value of parametr',
    error: 'Incorrect Input'
}
export const toManyFields = {
    statusCode: 400,
    message: 'To many Fields',
    error: 'Incorrect Input'
}
export const badDataFields = {
    statusCode: 400,
    message: 'Incorret data in fields',
    error: 'Incorrect Input'
}

export const badFields = {
    statusCode: 400,
    message: 'Incorret fields',
    error: 'Incorrect Input'
}

export const outOfArray = {
    statusCode: 404,
    message: 'Parametr more than length of array',
    error: 'Out of Array'
}

export function errorToJson(err){
    if(err['errors'][0]['location'] == 'params'){
        return badParametr
    }
    return badFields
}
