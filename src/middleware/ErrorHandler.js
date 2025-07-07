
class AppError extends Error {
    constructor(msg, statusCode){
        super(msg)
        this.StatusCode = statusCode
        this.isOperational  = true
        Error.captureStackTrace(this, this.constructor)
    }
}

const ErrorHandler = (err, req, res, next) => {
    console.log('❌ Middleware error handling')
    const errMsg = err.message || 'Internal server error'
    const errStatus = err.StatusCode || 500
    res.status(errStatus).json({
        status : 'error',
        message : errMsg,
        stack : err.stack
    })
}

export {ErrorHandler, AppError}