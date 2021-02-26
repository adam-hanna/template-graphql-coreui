import {
  BalanceCheck,
  LoginInput,
  User,
} from '../../data/schema'
import DB from '../../db'

export const login = async ({ email, password }: LoginInput): Promise<User> => {
  const db = DB.getInstance()
  if (!db.pool) {
    console.error("no pool")
    throw new Error("internal server error")
  }

  let ret: User = {
    id: "",
    email,
  }

  const client = await db.pool.connect()
  try {
    const res = await client.query(`
      SELECT
        id

      FROM
				users
			
      WHERE
        UPPER(email) = UPPER($1) AND
			  password IS NOT NULL AND
			  password = crypt($2, password)

      LIMIT
        1
    `, [email, password])

    if (!res || !res.rows || !res.rows.length) {
      console.error("no res")
      throw new Error("internal server error")
    }

    ret.id = res.rows[0].id

  } catch(e) {
    console.error(e)
    throw e

  } finally {
    client.release()
  }

  return ret
}

export const balanceChecks = async (userID: string): Promise<Array<BalanceCheck>> => {
  return []
}

export const queries = {
  login,
  balanceChecks,
}
