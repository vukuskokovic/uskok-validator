import { config } from "../config"
import { BaseDescriptor, BaseValidator, ExportedValueValidator, UskokValidatorError, undeifnedNullTypeCheck } from "../descriptors"
import { ErrorCodes } from "../errorTypes"

export interface ArrayDescriptor extends BaseDescriptor<any[]>{
    field?: ExportedValueValidator,
    minLength?: number,
    maxLength?: number
}

export const arrayValidator : BaseValidator = (val?:any[]|null, descriptor?:ArrayDescriptor) : UskokValidatorError | undefined => {
    const {isProvided, error} = undeifnedNullTypeCheck('array', val, descriptor)
    if(!Array.isArray(val)) return {errorCode: 'wrong_type', computedMessage: config.wrongTypeMessage('array')}
    if(error) return error

    if(descriptor && isProvided){
        if(descriptor.maxLength !== undefined && val!.length > descriptor.maxLength) return {errorCode: 'array_too_long', computedMessage: config.arrayTooLongMessage(descriptor.maxLength)}
        if(descriptor.minLength !== undefined && val!.length < descriptor.minLength) return {errorCode: 'array_too_short', computedMessage: config.arrayTooSmallMessage(descriptor.minLength)}

        if(descriptor.field && val.length > 0){
            let i = 0
            for(let valInArray of val){
                const error = descriptor.field(valInArray)
                if(error) return {
                    index: i,
                    errorCode: error.errorCode,
                    computedMessage: config.arrayAtIndexError(i, error.computedMessage)
                }
                i++
            }
        }
    }

    return undefined
}