const table = require('./table')

module.exports = router => {


    router.post('/createTable', table.create)

    router.get('/queryTables', table.query)

    router.del('/delTable', table.del)

    router.post('/updateTable', table.update)


    router.get('/queryRow', table.queryRow)

    router.put('/addRow', table.addRow)

    router.del('/delRow', table.delRow)

    router.post('/updateRow', table.updateRow)


    router.get('/queryCols', table.queryCols)

    router.put('/addCol', table.addCol)

    router.del('/delCol', table.delCol)





}