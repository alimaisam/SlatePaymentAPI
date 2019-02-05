import mysql from 'mysql2/promise'

async function Database ({ pool, host, user, database, password, port }) {
  // Use connection pool to avoid sudden termination of the connection
  const connection = mysql.createPool({
    connectionLimit: pool,
    host,
    user,
    database,
    password,
    port
  })
  return connection
}

export default Database