export const dbConfig = {
  database: process.env.PGDATABASE || "postgres",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
}

export const host = process.env.HOST || "localhost"
export const port = Number(process.env.PORT || 8080)

export const emailConfig = {
  username: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
}
