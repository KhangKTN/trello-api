import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

export const errorHandler = (error, req, res) => {
    const { name, statusCode, message, stack } = error

    const responseError = { name, statusCode, message, stack }
    if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
        req.log.error(message)
        responseError.message = 'Something is wrong!'

        // Do not return stack in production env
        if (env.BUILD_MODE !== 'dev') {
            delete responseError.stack
        }
    }

    res.status(statusCode).send(responseError)
}

export const notFoundHandler = (_, res) => {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'Resource is not exists!', errCode: res.statusCode })
}
