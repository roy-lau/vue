const axios = require('axios');

const instance = axios.create({
    baseURL:`//${process.env.HOST || 'localhost'}:${process.env.PORT || 3005}`,
    timeout: 1000,
    headers:{

    }
})

module.exports = instance