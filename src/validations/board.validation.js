import Joi from 'joi'
import { BOARD_TYPES } from '~/utils/constant.util'

const boardSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(500).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
})

export const boardValidate = {
    schema: { body: boardSchema },
    validatorCompiler: ({ schema }) => {
        return (data) => schema.validate(data, { abortEarly: false })
    }
}
