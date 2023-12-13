import { config } from "../config"
import { BaseDescriptor, BaseValidator, ExportedValueValidator, UskokValidatorError, undeifnedNullTypeCheck } from "../descriptors"
import { ErrorCodes } from "../errorTypes"

export interface ObjectDescriptor extends BaseDescriptor<any>{
    fields?: Record<string, ExportedValueValidator>
}

export const objectValudator : BaseValidator = (val?:any|null, descriptor?:ObjectDescriptor) : UskokValidatorError | undefined => {
    const {isProvided, error} = undeifnedNullTypeCheck('object', val, descriptor)
    if(error) return error
    if(Array.isArray(val)) return {errorCode: 'wrong_type', computedMessage: config.wrongTypeMessage('object')}

    if(descriptor && isProvided){
        if(descriptor.fields){
            for(let [fieldName, exportedValidator] of Object.entries(descriptor.fields)){
                const value = val![fieldName]

                const error = exportedValidator(value)
                if(error) return {
                    computedMessage: config.objectErrorMessage(fieldName, error.computedMessage),
                    errorCode: error.errorCode,
                    name: fieldName
                }
            }
        }
    }

    return undefined
}