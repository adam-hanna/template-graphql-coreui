import {
  Pool,
} from 'pg'
import {
  migrate
} from "postgres-migrations"

type dbConfigType = {
  database: string;
  user: string;
  password: string;
  host: string;
  port: number;
}

export default class DB {
  dbConfig: dbConfigType | undefined = undefined

  pool: Pool | undefined;

  public async connect(dbConfig: dbConfigType): Promise<void> {
    this.dbConfig = dbConfig
    this.pool = new Pool({
      ...dbConfig
    })
  }

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB()
    }

    return DB.instance
  }

  public async migrate(): Promise<void> {
    if (!this.pool) {
      throw new Error("no pool")
    }

    const client = await this.pool.connect()
    try {
      await migrate({ client }, "./migrations")
    } catch(e) {
      console.error(e)
      throw e
    } finally {
      client.release()
    }
  }

  private static instance: DB

  private constructor () {}
}
