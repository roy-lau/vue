const path = require('path'),
    fs = require('fs'),
    accessToken_file = path.join(__dirname, 'access_token.txt')

module.exports = {
    appID: 'wxc4d20db6067fceaa',
    appsecret: 'e86de310c9ec280b068c49ca705a07a5',
    token: '',
    getAccessToken() {
        return new Promise((resolve, reject) => {
            try {
                let data = fs.readFileSync(accessToken_file, 'utf-8')
                resolve(data)
            } catch (e) {
                reject(e)
            }
        })
    },
    saveAccessToken(data) {
        return new Promise((resolve, reject) => {
            try {
                data = JSON.stringify(data)
                let content = fs.writeFileSync(accessToken_file, data, 'utf-8')
                resolve(content)
            } catch (e) {
                reject(e)
            }
        })
    },
}