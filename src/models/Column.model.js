import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { ApiError } from '~/utils/error.util'
import { OBJECT_ID_TYPE } from '~/utils/rule.util'

const COLUMN_COLLECTION_NAME = 'columns'

const columnSchema = Joi.object({
    boardId: OBJECT_ID_TYPE,
    title: Joi.string().required().max(50).trim(),
    cardOrderIds: Joi.array().items(OBJECT_ID_TYPE).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _isDestroy: Joi.boolean().default(false)
})

const validateBeforeSave = async (data) => {
    try {
        return await columnSchema.validateAsync(data, { abortEarly: false })
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.details.map((e) => e.message).join(', '))
    }
}

export default {
    COLUMN_COLLECTION_NAME,
    columnSchema,
    validateBeforeSave
}
