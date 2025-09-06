import { StatusCodes } from 'http-status-codes'
import columnService from '~/services/column.service'

const create = async (req, res) => {
    const data = await columnService.create(req.body)
    return res.status(StatusCodes.CREATED).send({ message: 'Create column succeed!', data })
}

const updateCardOrder = async (req, res) => {
    const data = await columnService.updateCardOrderIds(req.body)
    return res.status(StatusCodes.OK).send({ message: 'Update column succeed!', data })
}

const deleteColumn = async (req, res) => {
    const columnId = req.params.id
    const deleteSuccess = await columnService.deleteColumn(columnId)
    return res
        .status(StatusCodes.OK)
        .send({ message: deleteSuccess ? 'Deleted column succeed!' : 'Deleted column failed!' })
}

export default { create, updateCardOrder, deleteColumn }
