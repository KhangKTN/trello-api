import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let dbInstance = null

// Init a instance to connect to MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    // Optional
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export const CONNECT_DB = async () => {
    await mongoClientInstance.connect()
    dbInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
    if (!dbInstance) throw new Error('Must be ConnectDB first!')
    return dbInstance
}

// Close connect DB
export const CLOSE_CONNECT = async () => {
    if (dbInstance) await dbInstance.close()
}