module.exports = {
  development: {
    username: process.env.user,
    password: process.env.pass,
    database: process.env.db,
    host: process.env.host,
    dialect: "mysql",
    operatorsAliases: false,
    define: {
      "timestamps": false
    }
  },
  test: {
    username: process.env.user,
    password: process.env.pass,
    database: process.env.db,
    host: process.env.host,
    dialect: "mysql",
    operatorsAliases: false
  },
  production: {
    username: process.env.user,
    password: process.env.pass,
    database: process.env.db,
    host: process.env.host,
    dialect: "mysql",
    operatorsAliases: false
  }
};
