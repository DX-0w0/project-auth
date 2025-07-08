const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_uri: process.env.MONGODB_URI_DEV,
      },
    }
  }

  return {
    env: {
      mongodb_uri: process.env.MONGODB_URI,
    },
  }
}
