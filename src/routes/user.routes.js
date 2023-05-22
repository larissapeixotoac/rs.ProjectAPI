const { Router } = require("express")
const multer = require('multer')

const uploadConfig = require('../configs/upload')
const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER )

// function myMiddleware(request, response, next) {
//     const { isAdmin } = request.body
//     //podia ser no if: request.body.isAdmin
//     if (!isAdmin) {
//         return response.json({ message: "user unauthorized"})
//     }
    
//     next()
// }

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

//n é mais necessário deixar /users aqui pq ja tá vindo com a destinação certa no index.js. o / é a raiz da rota que chegou aqui
// usersRoutes.post("/", (request, response) => {
//     const { name, email, password } = request.body

//     // response.send(`
//     //     Usuário: ${name} - E-mail: ${email} e a senha: ${password}
//     // `)

//     //a respota tb pode ser enviada em outros formatos (json é muito utilizado):
//     response.json({ name, email, password })
// })

//Pra usar o middlaware em todas as rotas do usersRoutes:
//usersRoutes.use(myMiddleware)
//Pra usar o middlaware em uma rotas do usersRoutes:
//usersRoutes.post("/", myMiddleware, usersController.create)

usersRoutes.post("/", usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update) //carregar a img do usuário

module.exports = usersRoutes