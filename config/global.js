const config = {
  database: {
    type: "postgres",
    user: "postgres",
    database: "scbhack", // database name
    password: "password",
    port: "5432",
    host: "localhost",
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
