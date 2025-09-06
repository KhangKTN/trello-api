import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/rule.util'

const columnSchema = Joi.object({
    title: Joi.string().required().trim().max(50).message('Title is not blank and maximum 50 character'),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
})

export const columnValidate = {
    schema: { body: columnSchema },
    validatorCompiler: ({ schema }) => {
        return (data) => schema.validate(data, { abortEarly: false })
    }
}
