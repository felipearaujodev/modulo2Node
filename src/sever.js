const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
/* @é mais recomendado utilizar express-session-redis para sessoes
    @neste caso onde usamos servidor offline na própria máquina vamos usar
  file-store para criar um json na pasta tmp/session com os dados de usuário
*/

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.midlewares()
    this.views()
    this.routes()
  }

  midlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true
      })
    )
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express // exporta uma instancia do app
