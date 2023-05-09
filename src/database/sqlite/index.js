// import { path } from 'path' - por algum motivo n funciona importar desse jeito

const sqlite3 = require('sqlite3') //drive que vai estabelecer conexão com a base de dados, que será utilizado
const sqlite = require('sqlite') //responsável por conectar o drive
const path = require('path')//biblioteca para resolver problema de ir para a pasta correta no windows

async function sqliteConnection() {
    const database = await sqlite.open({
        //aqui deve constar um objeto com configs da conexão

        //1 - onde que salvar o arq do banco de dados:
        // filename: path.resolve(__dirname, "../../", "database.db"),
        filename: '/home/larissa/shared/database.db',

        //__dirname: pega de forma automática onde se encontra
        //"..": volta uma pasta pra trás
        driver: sqlite3.Database
    })

    return database
}

module.exports = sqliteConnection

// SGBD - Sistema Gerenciado de Banco de Dados