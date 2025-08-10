import { StatusCodes } from 'http-status-codes'
import { ApiError } from '~/utils/error.util'
import { env } from './env.config'

const WHITELIST_DOMAINS = ['http://localhost:5173']

export const corsOptions = {
    origin: function (origin, cb) {
        const isTestApi = !origin && env.BUILD_MODE === 'dev'
        if (isTestApi) {
            return cb(null, true)
        }
        if (WHITELIST_DOMAINS.includes(origin)) {
            return cb(null, true)
        }
        return cb(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by CORS policy`), false)
    },
    // Pass request from cookies
    credentials: true
}
