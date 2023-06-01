const { hash } = require('bcryptjs')
const AppError = require("../utils/AppError")

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    
    async execute({ name, email, password }) {      
        const checkUserExist = await this.userRepository.findByEmail(email)

        if(checkUserExist) {  
            throw new AppError('Este e-mail já está em uso.')
        }

        const hashedPassword = await hash(password, 8)

        // await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword])
        const userCreated = await this.userRepository.create({ name, email, password: hashedPassword })

        return userCreated
    }
}

module.exports = UserCreateService