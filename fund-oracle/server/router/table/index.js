const db = require('../../dbs')

function formetRows(rows) {
    let _obj = rows,
        _str = ''
    _obj.forEach(item => {
        _str += item.name + ' ' + item.type + ' ' + 'COMMENT "' + item.cname + '",'
    })
    return _str
}
/**
 * 创建表
 * name 表名
 * cname 表中文名
 * rows {
 *  name 列名
 *  cname 列中文名（comment）
 *  type 列类型
 *  empty： NOT NULL 是否可以为空
 * }
 */
const createTable = async (tableName = 'user', tableCName = '用户表', rows) => {
    rows = formetRows(rows)
    const create_table_sql = `CREATE TABLE IF NOT EXISTS ${tableName}(
      id INT UNSIGNED AUTO_INCREMENT,
      ${rows}
      PRIMARY KEY ( id )
    )ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='${tableCName}';`


    let _rows = await db.query(create_table_sql)
}
// 查询数据库下的所有表格
const queryTables = async (dbName = 'oracle-test') => {

    let query_tables_sql = `SELECT TABLE_NAME,TABLE_COMMENT,CREATE_TIME,UPDATE_TIME,TABLE_COLLATION
                        FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='${dbName}'
                        AND TABLE_TYPE='BASE TABLE';`
    let rows = await db.query(query_tables_sql)

    return rows
}

// 修改表名称
const updateTableName = async ({ oldName, newName, oldCName, newCName }) => {

    await db.query(`ALTER TABLE ${oldName} RENAME ${newName};`)
    await db.query(`ALTER TABLE ${newName} COMMENT "${newCName}";`)

}


// 查询列名
const _queryRow = async (tableName) => {
    let query_row_sql = `select column_name,column_type,column_comment
            from information_schema.columns
            where table_schema='oracle-test'
            and table_name='${tableName}';`
    let row = await db.query(query_row_sql)

    return row
}

// 新增一列
const _addRow = async (tableName, column) => {

    let add_column_sql = `ALTER TABLE ${tableName}
                        ADD COLUMN ${column.name} ${column.type} COMMENT '${column.cname}';`

    await db.query(add_column_sql)

}

// 修改列
const _updateRow = async (tableName, oldRowName, column) => {

    let update_row_sql = `ALTER TABLE ${tableName}
                          CHANGE COLUMN ${oldRowName} ${column.name} ${column.type} COMMENT '${column.cname}';`
    await db.query(update_row_sql)

}

// 新增一行
const _addCol = async (tableName, data) => {
    let keys = Object.keys(data).join(","),
        values = Object.values(data).join("','")

    let add_col_sql = `INSERT INTO ${tableName} (${keys}) VALUES ('${values}');`

    await db.query(add_col_sql)
}

// 修改一行
const _updateCol = async (tableName, id, data) => {
    let sqlStr = ''

    for (let key in data) {
        sqlStr += ` ${key}='${data[key]}',`
    }
    sqlStr = sqlStr.substr(0, sqlStr.length - 1);


    let add_col_sql = `UPDATE ${tableName} SET ${sqlStr} WHERE ID=${id};`

    let rows = await db.query(add_col_sql)
    return rows
}

module.exports = {
    async create(ctx) {
        let { tableName, tableCName, rows } = ctx.request.body
        try {
            await createTable(tableName, tableCName, rows)

            ctx.body = { code: 0, msg: '创建成功！' }
        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    async query(ctx) {
        // ctx.request.body
        try {
            const rows = await queryTables()

            ctx.body = { code: 0, msg: '查询成功！', result: rows }
        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    async update(ctx) {
        let data = ctx.request.body
        console.log(data)
        try {
            const rows = await updateTableName(data)

            ctx.body = { code: 0, msg: '修改成功！', result: rows }
        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    async del(ctx) {
        const { tableName } = ctx.request.query
        try {
            await db.execute(`DROP TABLE IF EXISTS ${tableName};`)

            ctx.body = { code: 0, msg: '删除成功！' }
        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    async queryRow(ctx) {
        const { tableName } = ctx.request.query
        try {
            const row = await _queryRow(tableName)
            ctx.body = { code: 0, msg: '查询成功！', result: row }
        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    async addRow(ctx) {
        const { tableName, column } = ctx.request.body
        try {
            const row = await _addRow(tableName, column)

            ctx.body = { code: 0, msg: '新增成功！', result: row }
        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    async updateRow(ctx) {
        const { tableName, oldRowName, column } = ctx.request.body

        try {
            const row = await _updateRow(tableName, oldRowName, column)

            ctx.body = { code: 0, msg: '修改成功！', result: row }
        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }

    },
    /**
     * @title 删除列
     *
     * @param  {
     *    tebleName:'表'
     *    rowName:'列名'
     * }
     * @return {
     *    code: 1|0
     *    msg: String
     *    result: Object
     * }
     */
    async delRow(ctx) {
        const { tableName, rowName } = ctx.request.query
        try {
            const row = await db.query(`ALTER TABLE ${tableName} DROP COLUMN ${rowName};`)
            ctx.body = { code: 0, msg: '查询成功！', result: row }

        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    /**
     * @param  {String} tableName 表名
     * @return {}
     */
    async queryCols(ctx) {
        const { tableName } = ctx.request.query
        try {

            const row = await db.query(`select * from ${tableName};`)
            ctx.body = { code: 0, msg: '查询成功！', result: row }

        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    async addCol(ctx) {
        const { tableName, data } = ctx.request.body
        try {
            const row = await _addCol(tableName, data)

            ctx.body = { code: 0, msg: '删除成功！', result: row }

        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    async updateCol(ctx) {
        const { tableName, id, data } = ctx.request.body
        try {
            const row = await _updateCol(tableName, id, data)

            ctx.body = { code: 0, msg: '修改成功！', result: row }

        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    },
    async delCol(ctx) {
        const { tableName, id } = ctx.request.query
        try {
            const row = await db.query(`DELETE FROM ${tableName} WHERE ID=${id};`)

            ctx.body = { code: 0, msg: '删除成功！', result: row }

        } catch (err) {
            ctx.body = { code: 1, msg: err }
        }
    }

}