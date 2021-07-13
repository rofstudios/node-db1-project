let db = require('../../data/db-config');

// arrow async function
const getAll = async () => {
  // DO YOUR MAGIC
  // SELECT id, name FROM accounts
  // let accountsRes = await db('accounts')
  let accountsRes = await db.select('id', 'name').from('accounts') // shortening to just the name and id
  return accountsRes;
}

// non arrow async function
// async function getAll() {
//   let accountsRes = await db('accounts')
//   return accountsRes;
// }

const getById = id => {
  // DO YOUR MAGIC
  //   SELECT * FROM accounts
  //   WHERE id = 1
  return db.select('id', 'name', 'budget').from('accounts') // select() works too for selecting everything
    // can also just do db('accounts')
    .where('id', id) // this can also be .where({id})
    .first()

}

const create = async ({ name, budget }) => {
  // DO YOUR MAGIC
  let [numRes] = await db('accounts').insert({ name, budget })
  return getById(numRes);

}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).update(account)
    .then(returned => {
      if (returned > 0) {
        return getById(id)
      } else {
        return `Could not update account with id: ${id}`
      }
    })
}

const deleteById = async id => {
  let beforeDeleteAccount = await db.select('id', 'name').from('accounts').first()
  .where({id})
  let deletedCount = await db('accounts')
  .where({id})
  .del()
  console.log(deletedCount, 'deleted count')
  if(deletedCount == 1) {
    return beforeDeleteAccount
  }else {
    return 'no data was deleted'
  }
  // return beforeDeleteAccount

  // return db('accounts').where({id}).del()
  // .then(deletedCount => {
  //   return deletedCount
  // })
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
