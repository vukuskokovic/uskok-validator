import { BaseDescriptor, BaseValidator, ExportedValueValidator, undeifnedNullTypeCheck, uskokValidator } from "../descriptors"
import { ErrorCodes } from "../errorTypes"

export interface ObjectDescriptor extends BaseDescriptor<any>{
    fields?: Record<string, ExportedValueValidator>
}

export const objectValudator : BaseValidator = (val?:any|null, descriptor?:ObjectDescriptor) : ErrorCodes | undefined => {
    const {isProvided, errorCode} = undeifnedNullTypeCheck('object', val, descriptor)
    if(errorCode) return errorCode


    if(descriptor && isProvided){
        if(descriptor.fields){
            for(let [fieldName, exportedValidator] of Object.entries(descriptor.fields)){
                const value = val![fieldName]

                const error = exportedValidator(value)
                if(error) return error
            }
        }

        if(descriptor.validateFunc && descriptor.validateFunc(val!) === false) return 'validator_failed'
    }

    return undefined
}