import { StatusCodes } from 'http-status-codes'
import columnService from '~/services/column.service'

const create = async (req, res) => {
    const data = await columnService.create(req.body)
    return res.status(StatusCodes.CREATED).send({ message: 'Create column succeed!', data })
}

export default { create }
