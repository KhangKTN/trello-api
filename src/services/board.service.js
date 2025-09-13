import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb.config'
import BoardModal from '~/models/Board.model'
import CardModel from '~/models/Card.model'
import ColumnModel from '~/models/Column.model'
import { ServerError } from '~/utils/error.util'
import { createPlaceholderCard, slugify } from '~/utils/formatter.util'

const create = async (data) => {
    try {
        const newBoard = {
            ...data,
            slug: slugify(data?.title)
        }
        const validData = await BoardModal.validateBeforeSave(newBoard)
        const createdBoard = await GET_DB().collection(BoardModal.BOARD_COLLECTION_NAME).insertOne(validData)

        return await findById(createdBoard?.insertedId.toString())
    } catch (error) {
        throw new ServerError(error)
    }
}

const findById = async (id) => {
    try {
        const board = await GET_DB()
            .collection(BoardModal.BOARD_COLLECTION_NAME)
            .aggregate([
                { $match: { _id: ObjectId.createFromHexString(id), _isDestroy: false } },
                {
                    $lookup: {
                        from: ColumnModel.COLUMN_COLLECTION_NAME,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'columns'
                    }
                },
                {
                    $lookup: {
                        from: CardModel.CARD_COLLECTION_NAME,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'cards'
                    }
                }
            ])
            .toArray()

        if (!board[0]) {
            return null
        }

        // Put the cards in each column
        const result = cloneDeep(board[0])
        result.columns.forEach((column) => {
            column.cards = result.cards.filter((card) => card.columnId.equals(column._id))

            // Add place card into column empty
            if (!column.cards.length) {
                column.cards = [createPlaceholderCard(column)]
                column.cardOrderIds = [`${column._id}-placeholder-card`]
            }
        })
        delete result['cards']

        return result
    } catch (error) {
        throw new ServerError(error)
    }
}

const update = async (data) => {
    try {
        const updateData = { ...data }
        delete updateData['_id']

        return await GET_DB()
            .collection(BoardModal.BOARD_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: ObjectId.createFromHexString(data._id) },
                { $set: { ...updateData, updatedAt: Date.now() } },
                { returnDocument: 'after' }
            )
    } catch (error) {
        throw new ServerError(error)
    }
}

// Push columnId into columnOrderIds when add new column
const pushColumnOrderId = async (column) => {
    try {
        return await GET_DB()
            .collection(BoardModal.BOARD_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: column.boardId },
                { $push: { columnOrderIds: column._id } },
                { returnDocument: 'after' }
            )
    } catch (error) {
        throw new ServerError(error)
    }
}

export default { create, findById, pushColumnOrderId, update }
