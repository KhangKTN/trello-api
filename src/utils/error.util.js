import { StatusCodes } from 'http-status-codes'

export class ServerError extends Error {
    constructor(error) {
        super(error.message)
        this.name = error.name || 'ServerError'
        this.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export class ApiError extends Error {
    constructor(statusCode, errMsg) {
        super(errMsg)
        this.name = 'ApiError'
        this.statusCode = statusCode
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
