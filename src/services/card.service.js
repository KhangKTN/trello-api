import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb.config'
import CardModel from '~/models/Card.model'
import { ServerError } from '~/utils/error.util'
import cardValidation from '~/validations/card.validation'
import columnService from './column.service'

const create = async (data) => {
    try {
        const newCard = { ...data }
        const cardValid = await CardModel.validateBeforeSave(newCard)
        const createdCard = await GET_DB()
            .collection(CardModel.CARD_COLLECTION_NAME)
            .insertOne({
                ...cardValid,
                boardId: ObjectId.createFromHexString(cardValid.boardId),
                columnId: ObjectId.createFromHexString(cardValid.columnId)
            })

        const cardDb = await findById(createdCard.insertedId)
        if (cardDb._id) {
            // Update cardOrderIds in Column
            columnService.pushCardOrderId(cardDb)
        }

        return cardDb
    } catch (error) {
        throw new ServerError(error)
    }
}

const findById = async (_id) => {
    try {
        return await GET_DB().collection(CardModel.CARD_COLLECTION_NAME).findOne({ _id })
    } catch (error) {
        throw new ServerError(error)
    }
}

const update = async (card) => {
    try {
        const cardValid = await cardValidation.cardUpdate.validateAsync(card, { stripUnknown: true })

        if (cardValid.boardId) {
            cardValid.boardId = ObjectId.createFromHexString(card.boardId)
        }
        if (cardValid.columnId) {
            cardValid.columnId = ObjectId.createFromHexString(card.columnId)
        }
        delete cardValid['_id']

        return await GET_DB()
            .collection(CardModel.CARD_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: ObjectId.createFromHexString(card._id) },
                {
                    $set: {
                        ...cardValid,
                        updatedAt: Date.now()
                    }
                },
                { returnDocument: 'after' }
            )
    } catch (error) {
        throw new ServerError(error)
    }
}

export default { create, update }
