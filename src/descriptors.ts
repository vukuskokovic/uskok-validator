import { NumberDescriptor, numberValidator } from "./descriptors/number";
import { ObjectDescriptor, objectValudator } from "./descriptors/object";
import { StringDescriptor, stringValidator } from "./descriptors/string";
import { ErrorCodes } from "./errorTypes";

export interface BaseDescriptor<T>{
    validateFunc?:(val:T)=>boolean
    canBeNull?:boolean
    required?:boolean
}

export const undeifnedNullTypeCheck = (type: string, val?:any, descriptor?:BaseDescriptor<any>) : {isProvided:boolean, errorCode: ErrorCodes|undefined} => {
    const returnVal : {isProvided:boolean, errorCode: ErrorCodes|undefined} = {
        errorCode: undefined,
        isProvided: false
    }
    returnVal.isProvided = val !== null && val !== undefined
    if(val === undefined && descriptor?.required !== false) returnVal.errorCode = 'not_provided'
    if(val === null && descriptor?.canBeNull !== true) returnVal.errorCode = 'is_null'
    if(returnVal.isProvided && typeof val !== type) returnVal.errorCode = 'wrong_type'

    return returnVal
}

export type BaseValidator = (val?:any|null, descriptor?:any) => ErrorCodes | undefined;

export type ExportedValueValidator = (val?:any|null) => ErrorCodes | undefined;

const construct = (validator:BaseValidator, descriptor?: BaseDescriptor<any>) : ExportedValueValidator => {
    return (val:any) => validator(val, descriptor)
}

export const uskokValidator = {
    string: (descriptor?: StringDescriptor) => construct(stringValidator, descriptor),
    number: (descriptor?: NumberDescriptor) => construct(numberValidator, descriptor),
    object: (descriptor?: ObjectDescriptor) => construct(objectValudator, descriptor)
}