
class AppError extends Error {
    constructor(msg, statusCode){
        super(msg)
        this.StatusCode = statusCode
        this.isOperational  = true
        Error.captureStackTrace(this, this.constructor)
    }
}

const ErrorHandler = (err, req, res, next) => {
    console.log('❌ Middleware error handling!')

    // 1. Zod Validation error
    if (err.name === 'ZodError') {
        const errors = err.errors.map(e => e.message);
        return res.status(400).json({
            status: 'error',
            code: 'ValidationError',
            errors
        });
    }

    // 2. App error
    const errMsg = err.message || 'Internal server error'
    const errStatus = err.StatusCode || 500
    return res.status(errStatus).json({
        status : 'error',
        code : 'AppError',
        msg : errMsg,
        stack : err.stack
    })
}

export {ErrorHandler, AppError}