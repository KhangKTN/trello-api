import { StatusCodes } from 'http-status-codes'
import boardService from '~/services/board.service'

const create = async (req, res) => {
    const data = await boardService.create(req.body)
    return res.status(StatusCodes.CREATED).send({ message: 'Create board succeed!', data })
}

const getDetail = async (req, res) => {
    const boardId = req.params.id
    if (!boardId) {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Missed ID param!' })
    }

    const data = await boardService.findById(req.params.id)
    if (!data) {
        return res.status(StatusCodes.OK).send({ message: 'Get board by ID not found!', data })
    }
    return res.status(StatusCodes.OK).send({ message: 'Get board by ID successfully!', data })
}

const update = async (req, res) => {
    const data = await boardService.updateColumn(req.body)
    return res.status(StatusCodes.CREATED).send({ message: 'Update order columns in board succeed!', data })
}

export default { create, getDetail, update }
