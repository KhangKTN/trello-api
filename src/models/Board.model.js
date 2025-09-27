import { StatusCodes } from 'http-status-codes'
import { BOARD_TYPES } from '~/utils/constant.util'
import { ApiError } from '~/utils/error.util'
import { OBJECT_ID_TYPE } from '~/utils/rule.util'

const Joi = require('joi')

const BOARD_COLLECTION_NAME = 'boards'

const boardSchema = Joi.object({
    title: Joi.string().required().max(50).trim(),
    slug: Joi.string().required().trim(),
    description: Joi.string().min(3).max(500).trim(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
    columnOrderIds: Joi.array().items(OBJECT_ID_TYPE).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now()),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _isDestroy: Joi.boolean().default(false)
})

const validateBeforeSave = async (data) => {
    try {
        return await boardSchema.validateAsync(data, { abortEarly: false })
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.details.map((e) => e.message).join(', '))
    }
}

export default {
    BOARD_COLLECTION_NAME,
    boardSchema,
    validateBeforeSave
}
