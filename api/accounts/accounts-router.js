const router = require('express').Router();
let Accounts = require('./accounts-model');
let { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    let accountsRes = await Accounts.getAll()
    res.status(200).json(accountsRes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  console.log(req.body)
  let { id } = req.params
  Accounts.getById(id)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(err => {
      res.status(500).json(err)
    })

  // res.status(200).json(req.body);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  let newAccount = req.body;
  // DO YOUR MAGIC
  Accounts.create(newAccount)
    .then(addedAccount => {
      res.status(201).json(addedAccount)
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  let { id } = req.params;
  // DO YOUR MAGIC
  Accounts.updateById(id, req.body)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => {
      res.status(500).json(err)
    })

});

router.delete('/:id', checkAccountId, (req, res, next) => {
  let id = req.params.id
  Accounts.deleteById(id)
    .then(deletedAccount => {
        res.status(200).json(deletedAccount)
    })
    .catch(err => {
      // res.status(500).json(err);
      next(err);
    })
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
