module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user
    /* locals.user é definido e pode ser usado em qualquer aplicação */

    return next()
  }

  return res.redirect('/')
}
