import { StatusCodes } from 'http-status-codes'

export const errorHandler = (fastify, error, _, res) => {
    if (res.statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
        fastify.log.error(error.message)
        res.send({ message: 'Something is wrong!', errorCode: res.statusCode })
    } else {
        res.send({ message: error.message, errorCode: res.statusCode })
    }
}

export const notFoundHandler = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'Resource is not exists!', errCode: res.statusCode })
}
