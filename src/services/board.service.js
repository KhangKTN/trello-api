import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb.config'
import boardModal from '~/models/Board.model'
import { cardModel } from '~/models/Card.model'
import { columnModel } from '~/models/Column.model'
import { ServerError } from '~/utils/error.util'
import { slugify } from '~/utils/formatter.util'

const create = async (data) => {
    try {
        const newBoard = {
            ...data,
            slug: slugify(data?.title)
        }
        const validData = await boardModal.validateBeforeSave(newBoard)
        const createdBoard = await GET_DB().collection(boardModal.BOARD_COLLECTION_NAME).insertOne(validData)

        return await findById(createdBoard?.insertedId.toString())
    } catch (error) {
        throw new ServerError(error)
    }
}

const findById = async (id) => {
    try {
        const board = await GET_DB()
            .collection(boardModal.BOARD_COLLECTION_NAME)
            .aggregate([
                { $match: { _id: new ObjectId(id), _isDestroy: false } },
                {
                    $lookup: {
                        from: columnModel.COLUMN_COLLECTION_NAME,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'columns'
                    }
                },
                {
                    $lookup: {
                        from: cardModel.CARD_COLLECTION_NAME,
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
        })
        delete result['cards']

        return result
    } catch (error) {
        throw new ServerError(error)
    }
}

// Push columnId into columnOrderIds when add new column
const pushColumnOrderId = async (column) => {
    try {
        const result = await GET_DB()
            .collection(boardModal.BOARD_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: column.boardId },
                { $push: { columnOrderIds: column._id } },
                { returnDocument: 'after' }
            )

        return result.value
    } catch (error) {
        throw new ServerError(error)
    }
}

export default { create, findById, pushColumnOrderId }
