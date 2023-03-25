module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "SECRET",
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "socialApp",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",

    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  post:{
    port:process.env.POST_PORT || 3002,
  }
};