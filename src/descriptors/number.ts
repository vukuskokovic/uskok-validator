import { BaseDescriptor, BaseValidator, undeifnedNullTypeCheck } from "../descriptors"
import { ErrorCodes } from "../errorTypes"

export interface NumberDescriptor extends BaseDescriptor<number>{
    min?:number
    max?:number
}

export const numberValidator : BaseValidator = (val?:number|null, descriptor?:NumberDescriptor) : ErrorCodes | undefined => {
    const {isProvided, errorCode} = undeifnedNullTypeCheck('number', val, descriptor)
    if(errorCode) return errorCode


    if(descriptor && isProvided){
        if(descriptor.max !== undefined && val! > descriptor.max) return 'number_too_big'
        if(descriptor.min !== undefined && val! < descriptor.min) return 'number_too_small'
        if(descriptor.validateFunc && descriptor.validateFunc(val!) === false) return 'validator_failed'
    }

    return undefined
}