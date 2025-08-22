import { StatusCodes } from 'http-status-codes'
import cardService from '~/services/card.service'

const create = async (req, res) => {
    const data = await cardService.create(req.body)
    return res.status(StatusCodes.CREATED).send({ message: 'Create card succeed!', data })
}

export default { create }
