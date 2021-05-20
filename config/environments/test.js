exports.data = {
  server: {
    port: 3007
  },
  database: {
    name: 'xcloud_server_dev',
    user: 'developer',
    password: 'asdf1234',
    host: 'localhost'
  },
  secrets: {
    JWT: 'asdf1234',
    CRYPTO_SECRET: 'asdf1234',
    MAGIC_IV: 'NwpgsrPeJzwHNp3HRuvWmQAQvdv17zsG',
    MAGIC_SALT: 'NwpgsrPeJzwHNp3HRuvWmQAQvdv17zsGNwpgsrPeJzwHNp3HRuvWmQAQvdv17zsGNwpgsrPeJzwHNp3HRuvWmQAQvdv17zsGNwpgsrPeJzwHNp3HRuvWmQAQvdv17zsG'
  },
  logger: {
    level: 0
  },
  STORJ_BRIDGE: 'https://api.storx.io'
};
