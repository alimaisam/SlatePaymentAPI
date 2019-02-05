import { Ok, Err } from '../helper'

export default function Route (model) {
  async function processOrder (req, res) {
    try {
      const result = await model.process(req.body)
      Ok(res)(result)
    } catch (error) {
      Err(res)(error)
    }
  }
  
  return {
    processOrder
  }
}