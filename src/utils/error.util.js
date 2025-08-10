import { StatusCodes } from 'http-status-codes'

export class ServerError extends Error {
    constructor(errorMessage) {
        super(errorMessage)
        this.name = 'Server error'
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ApiError extends Error {
    constructor(statusCode, errorMessage) {
        super(errorMessage)
        this.name = 'Api error'
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}
