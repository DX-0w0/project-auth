const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: process.env.DB_USERNAME,
        mongodb_password: process.env.DB_PASSWORD,
        mongodb_clustername: process.env.DB_CLUSTERNAME,
        mongodb_database: process.env.DB_DATABASE_DEV,
      },
    }
  }

  return {
    env: {
      mongodb_username: process.env.DB_USERNAME,
      mongodb_password: process.env.DB_PASSWORD,
      mongodb_clustername: process.env.DB_CLUSTERNAME,
      mongodb_database: process.env.DB_DATABASE,
    },
  }
}
