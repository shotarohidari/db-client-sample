import { MongoClient } from "mongodb"

type IDBClient = {
  connect: () => Promise<void>
  query: () => Promise<void>
}

export class MDBClient implements IDBClient {
  private client: MongoClient
  constructor({ url }: { url: string }) {
    const client = new MongoClient(url)
    this.client = client
  }
  connect = async () => {
    await this.client.connect()
  }
  query = async () => {
    await this.client.db("admin").command({ ping: 1 })
    console.log("OK query.")
  }
}

export class DataManager {
  private setupPromise: Promise<unknown>
  private client: IDBClient
  constructor(client: IDBClient) {
    this.client = client
    const promise = new Promise<void>((resolve, reject) => {
      try {
        client.connect().then(() => resolve())
      } catch (e) {
        reject("Connection error!.")
      }
    })
    this.setupPromise = promise
  }
  async query() {
    await this.setupPromise

    // query
    this.client.query()
  }
}
