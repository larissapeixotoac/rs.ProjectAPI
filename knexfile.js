const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      // filename: path.resolve(__dirname, 'src', 'database', 'database.db')
      // usado acima para sempre criar o database no local certo sem ter problema de OS. Aqui ta diferente por conta do databse usado na aula, q é o SQLite, q n é usado na prática e por isso tem mais limitações
      filename: '/home/larissa/shared/database.db'
    },    
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb) //no SQLite a funcionalidade de deletar em cascata vem disabilitada, rodando esse função ao roda o knex, habilitar deletar as tags conectadas a uma nota q será deletada.
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },
    useNullAsDefault: true, //propriedade pardão pra trabalhar com SQLite, n sei se se usa nos outros db
  }
};
