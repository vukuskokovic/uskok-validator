import { config } from "./config";
import { ArrayDescriptor, arrayValidator } from "./descriptors/array";
import { NumberDescriptor, numberValidator } from "./descriptors/number";
import { ObjectDescriptor, objectValudator } from "./descriptors/object";
import { StringDescriptor, stringValidator } from "./descriptors/string";
import { ErrorCodes } from "./errorTypes";

export interface BaseDescriptor<T>{
    validateFunc?:(val:T)=>{didParse: boolean, errorMessage?:string}
    canBeNull?:boolean
    required?:boolean
}

export interface UskokValidatorError {
    name?:string,
    index?:number,
    next?:UskokValidatorError,
    errorCode:ErrorCodes,
    computedMessage:string
}

const typeMap : Record<string, string> = {
    'string' : 'string',
    'number' : 'number',
    'object' : 'object',
    'array'  : 'object'
}

export const undeifnedNullTypeCheck = (type: string, val?:any, descriptor?:BaseDescriptor<any>) : {isProvided:boolean, error: UskokValidatorError|undefined} => {
    const returnVal : {isProvided:boolean, error: UskokValidatorError|undefined} = {
        error: undefined,
        isProvided: false
    }
    returnVal.isProvided = val !== null && val !== undefined
    if(val === undefined && descriptor?.required !== false) returnVal.error = {errorCode: 'not_provided', computedMessage: config.notProvidedMessage()}
    if(val === null && descriptor?.canBeNull !== true) returnVal.error = {errorCode: 'is_null', computedMessage: config.valueIsNullMesage()}
    if(returnVal.isProvided && typeof val !== typeMap[type]) returnVal.error = {errorCode: 'wrong_type', computedMessage: config.wrongTypeMessage(type)}
    if(returnVal.isProvided && descriptor?.validateFunc) {
        const validatorReturn = descriptor.validateFunc(val)
        if(validatorReturn.didParse === false) {
            returnVal.error = {
                errorCode: "validator_failed",
                computedMessage: validatorReturn.errorMessage ?? "Custom validator failed"
            }
        }
    }

    return returnVal
}

export type BaseValidator = (val?:any|null, descriptor?:any) => UskokValidatorError | undefined;
export type ExportedValueValidator = (val?:any|null) => UskokValidatorError | undefined;

const construct = (validator:BaseValidator, descriptor?: BaseDescriptor<any>) : ExportedValueValidator => {
    return (val:any) => validator(val, descriptor)
}

export const uskokValidator = {
    string: (descriptor?: StringDescriptor) => construct(stringValidator, descriptor),
    number: (descriptor?: NumberDescriptor) => construct(numberValidator, descriptor),
    object: (descriptor?: ObjectDescriptor) => construct(objectValudator, descriptor),
    array : (descriptor?: ArrayDescriptor) => construct(arrayValidator, descriptor)
}