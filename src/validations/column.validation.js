import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/rule.util'

const columnSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
})

export const columnValidate = {
    schema: { body: columnSchema },
    validatorCompiler: ({ schema }) => {
        return (data) => schema.validate(data, { abortEarly: false })
    }
}
