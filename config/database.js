require("dotenv-safe").config();

module.exports = {
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: process.env.DBDIALECT,
}