import { MongoClient } from 'mongodb'

const CONNECTION = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.mongodb_clustername}.x7oroam.mongodb.net/?retryWrites=true&w=majority`

export async function connectToDatabase() {
  const client = await MongoClient.connect(CONNECTION)
  //   const db = client.db(process.env.DB_DATABASE)

  return client
}
