


interface APIError {
    message?:any
}
function errorHandler(error:any) {
    const MYError = error as APIError
    return MYError.message || {error :"Something went Wrong"}
    
}

export type {
    APIError
    
}
export {
    errorHandler
}

