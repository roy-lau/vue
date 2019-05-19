const table = require('./table')

module.exports = router => {

    /**
     * 表格
     */
    router.post('/createTable', table.create)

    router.get('/queryTables', table.query)

    router.del('/delTable', table.del)

    router.post('/updateTable', table.update)

    /**
     * 列
     */

    router.get('/queryRow', table.queryRow)

    router.put('/addRow', table.addRow)

    router.post('/updateRow', table.updateRow)

    router.del('/delRow', table.delRow)

    /**
     * 行
     */

    router.get('/queryCols', table.queryCols)

    router.put('/addCol', table.addCol)

    router.post('/updateCol', table.updateCol)

    router.del('/delCol', table.delCol)


}