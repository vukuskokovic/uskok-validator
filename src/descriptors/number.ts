import { config } from "../config"
import { BaseDescriptor, BaseValidator, UskokValidatorError, undeifnedNullTypeCheck } from "../descriptors"
import { ErrorCodes } from "../errorTypes"

export interface NumberDescriptor extends BaseDescriptor<number>{
    min?:number
    max?:number
    onlyInt?:boolean
}

export const numberValidator : BaseValidator = (val?:number|null, descriptor?:NumberDescriptor) : UskokValidatorError | undefined => {
    const {isProvided, error} = undeifnedNullTypeCheck('number', val, descriptor)
    if(error) return error


    if(descriptor && isProvided){
        if(descriptor.max !== undefined && val! > descriptor.max) return {errorCode: 'number_too_big', computedMessage: config.numberTooBigMessage(descriptor.max)}
        if(descriptor.min !== undefined && val! < descriptor.min) return {errorCode: 'number_too_small', computedMessage: config.numberTooSmallMessage(descriptor.min)}
        if(descriptor.onlyInt === true && !Number.isInteger(val!)) return {errorCode: 'number_not_int', computedMessage: config.numberIsNotInt()}
    }

    return undefined
}