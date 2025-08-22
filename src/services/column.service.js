import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb.config'
import { columnModel } from '~/models/Column.model'
import { ApiError, ServerError } from '~/utils/error.util'
import boardService from './board.service'

const create = async (data) => {
    try {
        const newColumn = { ...data }
        const columnValid = await columnModel.validateBeforeSave(newColumn)
        const createdColumn = await GET_DB()
            .collection(columnModel.COLUMN_COLLECTION_NAME)
            .insertOne({ ...columnValid, boardId: ObjectId.createFromHexString(columnValid.boardId) })

        const columnDb = await findById(createdColumn.insertedId)
        if (columnDb._id) {
            columnDb.cards = []

            // Update columnOrderIds in Board
            boardService.pushColumnOrderId(columnDb)
        }

        return columnDb
    } catch (error) {
        throw new ServerError(error)
    }
}

const findById = async (_id) => {
    try {
        if (!_id) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing ID')
        }
        return await GET_DB().collection(columnModel.COLUMN_COLLECTION_NAME).findOne({ _id })
    } catch (error) {
        throw new ServerError(error)
    }
}

// Push cardId into cardOrderIds when add new card
const pushCardOrderId = async (card) => {
    try {
        const result = await GET_DB()
            .collection(columnModel.COLUMN_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: card.columnId },
                { $push: { cardOrderIds: card._id } },
                { returnDocument: 'after' }
            )

        return result.value
    } catch (error) {
        throw new ServerError(error)
    }
}

export default { create, findById, pushCardOrderId }
