require("express-async-errors")
require('dotenv/config')

const express = require('express')
const cors = require('cors')

const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload')


const routes = require("./routes")

migrationsRun()

const app = express()

app.use(cors())

//ler sem parâmetro a ser passado, só para ir até a rota pretendida
// app.get("/message", (request, response) => {
//     response.send("hello world!")
// })

// ROUTES PARAMS:
//primeiro a rota e logo em seguida tem o parâmetro que deve ser recebido para retornar o requerido;
// os q vem em seguida dos dois pontos é o parâmetro
// mais de um patrâmetro: app.get("/message/:id/:user/:stats",
// app.get("/message/:id/:user", (request, response) => {
//     // desestruturação, para evitar escrever a mesma coisa várias vezes
//     //params: coisas simples, nada muito complexo.
//     const { id, user } = request.params

//     response.send(`
//         Mensagem ID: ${id}. 
//         Para o usuário ${user}.
//     `)
// })

// QUERY PARAMS: 
//ex: http://localhost:3333/users?page=5&limit=15
// app.get("/users", (request, response) => {
//     const { page, limit } = request.query

//     response.send(`
//         Página: ${page}. Mostrar: ${limit}.
//     `)
// })

//Essa linha faz com que o request embaixo do body, entenda que está pegando as informações de um arquivo json
app.use(express.json())

// //Method POST
// app.post("/users", (request, response) => {
//     const { name, email, password } = request.body

//     // response.send(`
//     //     Usuário: ${name} - E-mail: ${email} e a senha: ${password}
//     // `)

//     //a respota tb pode ser enviada em outro formato:
//     response.json({ name, email, password })
// })

//pra funcionar as rotas depois de colocado no index

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use(( error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode). json({
            status: 'error',
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: 'error',
        message: 'Internet server error'
    })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))


