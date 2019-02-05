export default function Model ({ store }) {
    
    async function process (params) {
      const rand = Math.floor((Math.random() * 10) + 1)
      var status = rand > 5 ? 'confirmed' : 'declined'
      const createdPayment = await store.create(params, status)
      return store.one(createdPayment.insertId)
    }
  
    return {
      process
    }
  }