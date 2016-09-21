'use strict'

module.exports.post= (req, res, err) =>
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
module.exports.index=(req, res) =>
  res.render('contact', { page: 'Contact' })
