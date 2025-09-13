import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb.config'
import { cardModel } from '~/models/Card.model'
import ColumnModel from '~/models/Column.model'
import { ApiError, ServerError } from '~/utils/error.util'
import boardService from './board.service'
import cardService from './card.service'

const create = async (data) => {
    try {
        const newColumn = { ...data }
        const columnValid = await ColumnModel.validateBeforeSave(newColumn)
        const createdColumn = await GET_DB()
            .collection(ColumnModel.COLUMN_COLLECTION_NAME)
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
        return await GET_DB().collection(ColumnModel.COLUMN_COLLECTION_NAME).findOne({ _id })
    } catch (error) {
        throw new ServerError(error)
    }
}

const updateCardOrderIds = async (data) => {
    const { card, sourceColumnId, targetColumnId, cardOrderIds } = data

    try {
        /**
         * If drag and drop into Column
         */
        if (sourceColumnId === targetColumnId) {
            await GET_DB()
                .collection(ColumnModel.COLUMN_COLLECTION_NAME)
                .findOneAndUpdate(
                    { _id: ObjectId.createFromHexString(sourceColumnId) },
                    { $set: { cardOrderIds: cardOrderIds, updatedAt: Date.now() } },
                    { returnDocument: 'after' }
                )
            return
        }

        // Remove cardId from column source
        await GET_DB()
            .collection(ColumnModel.COLUMN_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: ObjectId.createFromHexString(sourceColumnId) },
                { $pull: { cardOrderIds: card._id } },
                { returnDocument: 'after' }
            )

        // Update new orderIds for target column
        await GET_DB()
            .collection(ColumnModel.COLUMN_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: ObjectId.createFromHexString(targetColumnId) },
                { $set: { cardOrderIds: cardOrderIds, updatedAt: Date.now() } },
                { returnDocument: 'after' }
            )

        // Update Card data
        await cardService.update(card)

        return true
    } catch (error) {
        throw new ServerError(error)
    }
}

// Push cardId into cardOrderIds when add new card
const pushCardOrderId = async (card) => {
    try {
        return await GET_DB()
            .collection(columnModel.COLUMN_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: card.columnId },
                { $push: { cardOrderIds: card._id } },
                { returnDocument: 'after' }
            )
    } catch (error) {
        throw new ServerError(error)
    }
}

const deleteColumn = async (columnId) => {
    try {
        // Delete column
        const result = await GET_DB().collection(columnModel.COLUMN_COLLECTION_NAME).deleteOne({ _id: columnId })
        // Delete all card in column
        await GET_DB().collection(cardModel.CARD_COLLECTION_NAME).deleteMany({ columnId: columnId })

        return result.deletedCount > 0
    } catch (error) {
        throw new ServerError(error)
    }
}

export default { create, findById, pushCardOrderId, updateCardOrderIds, deleteColumn }
