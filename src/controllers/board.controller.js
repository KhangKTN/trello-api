import { StatusCodes } from 'http-status-codes'
import boardService from '~/services/board.service'
import { ServerError } from '~/utils/error.util'

const create = async (req, res) => {
    try {
        const data = await boardService.create(req.body)
        return res.status(StatusCodes.CREATED).send({ message: 'Create board succeed!', data })
    } catch (error) {
        throw new ServerError(error.message)
    }
}

const getDetail = async (req, res) => {
    try {
        const boardId = req.params.id
        if (!boardId) {
            return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Missed ID param!' })
        }
        const data = await boardService.findById(req.params.id)
        if (!data) {
            return res.status(StatusCodes.OK).send({ message: 'Get board by ID not found!', data })
        }
        return res.status(StatusCodes.OK).send({ message: 'Get board by ID successfully!', data })
    } catch (error) {
        throw new ServerError(error.message)
    }
}

export default { create, getDetail }
