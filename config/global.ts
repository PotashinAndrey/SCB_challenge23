const config = {
  database: {
    type: "postgres",
    user: "postgres",
    database: "scbhack", // database name
    password: "password",
    port: 5432,
    host: "localhost",

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  backend: {
    http: {
      host: "0.0.0.0",
      port: 3000
    }
  },
  frontend: {
    port: 8080
  }
}

export default config;
