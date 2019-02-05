export default function Store (db) {
  
  async function create (params, status) {
    const [rows] = await db.query('INSERT INTO `Payment` (order_id, payment_status) VALUES (?, ?)', [params.data.orderId, status])
    return rows
  }

  async function one (id) {
    const [rows] = await db.query('SELECT * FROM `Payment` WHERE id = ?', [id])
    return (rows && rows[0]) || null
  }

  return {
    one,
    create
  }
}