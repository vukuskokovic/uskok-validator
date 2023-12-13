export const config = {
    notProvidedMessage: () => 'Value is undefined',
    wrongTypeMessage: (type:string) => `Value is not the right type, type: '${type}'`,
    valueIsNullMesage: () => 'Value cannot be null',
    stringTooShortMessage: (minLength:number) => `String is to shoort, min length: ${minLength}`,
    stringTooLongMessage: (maxLength:number) => `String is to long, max length: ${maxLength}`,
    stringRegexFailedMessage: () => `String regex failed`,
    stringNotValidValueMessage: (val:string[]) => `String is not valid value, values: ${val.join(', ')}`,
    numberTooBigMessage: (max:number) => `Number is too big, max: ${max}`,
    numberTooSmallMessage: (min:number) => `Number is too small, min: ${min}`,
    numberIsNotInt: () => `Number is not an integer`,
    arrayTooLongMessage: (max:number) => `Array is too long, max: ${max}`,
    arrayTooSmallMessage: (min:number) => `Array is too short, min: ${min}`,
    arrayAtIndexError: (index:number, message: string) => `Value at index [${index}]: ${message}`,
    objectErrorMessage: (name:string, message:string) => `${name}: ${message}`
}