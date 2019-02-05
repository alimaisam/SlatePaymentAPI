export default {
    host: {
      doc: 'MySQL hostname',
      format: String,
      default: '127.0.0.1',
      env: 'DB_HOST'
    },
    pool: {
      doc: 'Defines the maximum connection that can be made to MySQL',
      format: Number,
      default: 10,
      env: 'DB_POOL'
    },
    database: {
      doc: 'MySQL name',
      format: String,
      default: 'SlateOrder',
      env: 'DB_NAME'
    },
    user: {
      doc: 'MySQL username',
      format: String,
      default: 'root',
      env: 'DB_USER'
    },
    password: {
      doc: 'MySQL password',
      format: String,
      default: '',
      env: 'DB_PASS'
    },
    port: {
      doc: 'MySQL port',
      format: 'port',
      default: '3306',
      env: 'DB_PORT'
    }
  }