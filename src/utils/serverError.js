import { StatusCodes } from 'http-status-codes'

// Class handle error common of server
export default class ServerError extends Error {
    constructor(errorMessage) {
        super(errorMessage)
        this.name = 'Server error'
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        Error.captureStackTrace(this, this.constructor)
    }
}