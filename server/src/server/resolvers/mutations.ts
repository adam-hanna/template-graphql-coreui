import {
  BalanceCheck,
  NewBalanceCheckInput,
  RegisterInput,
  User,
} from '../../data/schema'
import DB from '../../db'

export const register = async ({ email, password }: RegisterInput): Promise<User> => {
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
      INSERT INTO
				users(email, password)
			
			VALUES
				($1, crypt($2, gen_salt('bf', 10)))
			RETURNING
				id as userID
    `, [email, password])

    if (!res || !res.rows || !res.rows.length) {
      console.error("no res")
      throw new Error("internal server error")
    }

    ret.id = res.rows[0].userID

  } catch(e) {
    console.error(e)
    throw e

  } finally {
    client.release()
  }

  return ret
}

export const newBalanceCheck = async ({ userID,  requesteeEmail, balance }: NewBalanceCheckInput): Promise<BalanceCheck> => {
  throw new Error("not implemented")
}

export const mutations = {
  register,
  newBalanceCheck,
}
