const mysql = require('mysql2')
// 创建一个连接池
const pool = mysql.createPool({
    "host": "139.199.99.154",
    "user": "dev",
    "password": "dev123!",
    "database": "oracle-test"
});

// 接收一个sql语句 以及所需的values
// 这里接收第二参数values的原因是可以使用mysql的占位符 '?'
// 比如 query(`select * from my_database where id = ?`, [1])

let query = function(sql, values) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        connection.rollback(function() {
                            console.error('事务失败 query：' + sql + '\n ERROR：' + err)
                            reject(err)
                        })
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}

let execute = function(sql, values) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.execute(sql, values, (err, rows) => {

                    if (err) {
                        connection.rollback(function() {
                            console.error('事务失败 execute：' + sql + '\n ERROR：' + err)
                            reject(err)
                        })
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}

module.exports = {
    query: query,
    execute: execute,
}