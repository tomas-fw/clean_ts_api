export default {
  mongoRul: process.env.MONRO_URL ?? 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT ?? 4000
}