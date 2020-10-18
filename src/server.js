// importar dependência
const express = require('express')
const path = require('path')
const pages = require('./pages.js')

// iniciando o express
const server = express()
server

// utilizar body da requisição (req)
.use(express.urlencoded({ extended: true }))

// utilizando os arquivos estáticos
.use(express.static('public'))

// configurar template engine
.set('views', path.join(__dirname, "views"))
.set('view engine', 'hbs')

// rotas da aplicação
.get('/', pages.index)        //    '/' é igual a '/index.html | req = request   res = response
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/create-orphanage', pages.createOrphanage) // Não tem  -  aki
.post('/save-orphanage', pages.saveOrphanage)


// ligar o servidor
server.listen(5500)