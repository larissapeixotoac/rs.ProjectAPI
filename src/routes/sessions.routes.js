const { Router } = require('express')

const SessionsController = require('../controllers/SessionsController')
const sessionsController = new SessionsController()

const sesssionRoutes = Router()
sesssionRoutes.post('/', sessionsController.create)

module.exports = sesssionRoutes