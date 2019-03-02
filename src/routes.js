const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const grestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentsController = require('./app/controllers/AppointmentsController')
const AvailableController = require('./app/controllers/AvailableController')
const EditController = require('./app/controllers/EditController')

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.use('/app', authMiddleware)
/* todas as rotas dentro de /app estão protegidas pelo middleware, ou seja,
o usuário deve estar logado para acessar qualquer aplicação dentro de app */

routes.get('/files/:file', FileController.show)

routes.get('/', grestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', grestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentsController.create)
routes.post('/app/appointments/new/:provider', AppointmentsController.store)

routes.get('/app/available/:provider', AvailableController.index)

routes.get('/app/editor', EditController.index)

module.exports = routes
