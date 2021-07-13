// let db = require('./accounts-model');
let db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  let { name, budget } = req.body;
  if (typeof name === "undefined" || typeof budget === 'undefined') {
    res.status(400).json({ message: "name and budget are required" });

  } else if (typeof name !== 'string') {
    res.status(400).json({ message: "name of account must be a string" });

  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })

  } else if (typeof budget ==='number') {
    if (Math.sign(budget) === -1 || budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" })

    } else {
      req.body.name = req.body.name.trim();
      next();
    }
  } else {
    res.status(400).json({ message: "budget of account must be a number" })

  }

}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  db.select('name').from('accounts').where('name', 'like', req.body.name).first()
    .then(accountName => {
      if (accountName) {
        res.status(400).json({ message: "that name is taken" })
      } else {
        next();
      }
    })

}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  // db.getById(req.params.id)
  //   .then(account => {
  //     if (account) {
  //       req.body = account
  //       next()
  //     } else {
  //       res.status(404).json({ message: "account not found" })
  //     }
  //   })
  db.select('id').from('accounts').where('id', req.params.id).first()
    .then(id => {
      if (id) {
        next();
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
}
