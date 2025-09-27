import { StatusCodes } from 'http-status-codes'
import cardService from '~/services/card.service'

const create = async (req, res) => {
    const data = await cardService.create(req.body)
    return res.status(StatusCodes.CREATED).send({ message: 'Create card succeed!', data })
}

const update = async (req, res) => {
    const data = await cardService.update(req.body)
    return res.status(StatusCodes.OK).send({ message: 'Update card succeed!', data })
}

const remove = async (req, res) => {
    const deleted = await cardService.remove(req.params.id)

    if (!deleted) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: 'Delete card failed!' })
    }
    return res.status(StatusCodes.OK).send({ message: 'Deleted card succeed!' })
}

export default { create, update, remove }
