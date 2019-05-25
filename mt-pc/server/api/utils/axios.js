const axios = require('axios');

const instance = axios.create({
  baseURL: `http://${process.env.HOST || '127.0.0.1'}:${ 3000|| process.env.PORT || 3005}`,
  timeout: 1000,
  headers: {

  }
})

module.exports = instance
