import boardService from '~/services/boardService'
import ServerError from '~/utils/serverError'
const { StatusCodes } = require('http-status-codes')

export const createNew = async (req, res) => {
    try {
        const data = await boardService.createNewBoard(req.body)
        res.status(StatusCodes.CREATED).send({ message: 'Create board succeed!', data })
    } catch (error) {
        throw new ServerError(error.message)
    }
}
