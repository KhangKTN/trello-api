import Joi from 'joi'

const boardSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(500).trim().strict()
})

export const boardValid = {
    schema: { body: boardSchema },
    validatorCompiler: ({ schema }) => {
        return data => schema.validate(data, { abortEarly: false })
    }
}
