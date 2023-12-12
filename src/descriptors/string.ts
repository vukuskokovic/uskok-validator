import { BaseDescriptor, BaseValidator, undeifnedNullTypeCheck } from "../descriptors"
import { ErrorCodes } from "../errorTypes"

export interface StringDescriptor extends BaseDescriptor<string>{
    minLength?:number
    maxLength?:number,
    regex?:RegExp
}

export const stringValidator : BaseValidator = (val?:string|null, descriptor?:StringDescriptor) : ErrorCodes | undefined => {
    const {isProvided, errorCode} = undeifnedNullTypeCheck('string', val, descriptor)
    if(errorCode) return errorCode

    if(descriptor && isProvided){
        if(descriptor.maxLength !== undefined && val!.length > descriptor.maxLength) return 'string_too_long'
        if(descriptor.minLength !== undefined && val!.length < descriptor.minLength) return 'string_too_short'
        if(descriptor.validateFunc && descriptor.validateFunc(val!) === false) return 'validator_failed'
        if(descriptor.regex && descriptor.regex.test(val!) === false) return 'string_regex_failed'
    }

    return undefined
}