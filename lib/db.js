import { MongoClient } from 'mongodb'

const CONNECTION = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.CLUSTERNAME}.x7oroam.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`

export async function connectToDatabase() {
  const client = await MongoClient.connect(CONNECTION)
  //   const db = client.db(process.env.DB_DATABASE)

  return client
}
