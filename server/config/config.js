const config = require('./config.json')
const env = process.env.NODE_ENV || 'test'

if (env === 'development' || env === 'test') {
  let configEnv = config[env]

  Object.keys(configEnv).forEach(key => {
    process.env[key] = configEnv[key]
  })
} else if (env === 'production') {
  let configEnv = config[env]

  Object.keys(configEnv).forEach(key => {
    process.env[key] || (process.env[key] = configEnv[key])
  })
}
