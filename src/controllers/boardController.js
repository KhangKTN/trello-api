const { StatusCodes } = require('http-status-codes')

export const createNew = (req, res) => {
    try {
        res.status(StatusCodes.CREATED).send({ message: 'Create board succeed!' })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: error.message
        })
    }
}
