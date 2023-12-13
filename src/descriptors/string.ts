import { config } from "../config"
import { BaseDescriptor, BaseValidator, UskokValidatorError, undeifnedNullTypeCheck } from "../descriptors"
import { ErrorCodes } from "../errorTypes"

export interface StringDescriptor extends BaseDescriptor<string>{
    minLength?:number
    maxLength?:number,
    regex?:RegExp,
    validValues?:string[]
}

export const stringValidator : BaseValidator = (val?:string|null, descriptor?:StringDescriptor) : UskokValidatorError | undefined => {
    const {isProvided, error} = undeifnedNullTypeCheck('string', val, descriptor)
    if(error) return error

    if(descriptor && isProvided){
        if(descriptor.maxLength !== undefined && val!.length > descriptor.maxLength) return {errorCode: 'string_too_long', computedMessage: config.stringTooLongMessage(descriptor.maxLength)}
        if(descriptor.minLength !== undefined && val!.length < descriptor.minLength) return {errorCode: 'string_too_short', computedMessage: config.stringTooLongMessage(descriptor.minLength)}
        if(descriptor.regex && descriptor.regex.test(val!) === false) return {errorCode: 'string_regex_failed', computedMessage: config.stringRegexFailedMessage()}
        if(descriptor.validValues && descriptor.validValues.indexOf(val!) === -1) return {errorCode: 'string_not_valid_value', computedMessage: config.stringNotValidValueMessage(descriptor.validValues)}
    }

    return undefined
}