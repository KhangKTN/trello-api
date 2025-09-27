import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { ApiError } from '~/utils/error.util'
import { OBJECT_ID_TYPE } from '~/utils/rule.util'

const CARD_COLLECTION_NAME = 'cards'

const cardSchema = Joi.object({
    boardId: OBJECT_ID_TYPE,
    columnId: OBJECT_ID_TYPE,
    title: Joi.string().required().max(50).trim(),
    description: Joi.string().max(1000).default('').allow(''),
    image: Joi.string().max(1000).trim().allow(''),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _isDestroy: Joi.boolean().default(false)
})

const validateBeforeSave = async (data) => {
    try {
        return await cardSchema.validateAsync(data, { abortEarly: false, stripUnknown: true })
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.details.map((e) => e.message).join(', '))
    }
}

export default {
    CARD_COLLECTION_NAME,
    cardSchema,
    validateBeforeSave
}
