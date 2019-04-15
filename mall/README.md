# mall

## mongodb 导出数据

```bash
	# 导出
	mongoexport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db mall --collection goods --type json --out goods.json

	mongoexport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db mall --collection users --type json --out users.json
```

## mongodb 导入数据

```bash
	mongoimport -d 数据库名 -c 文档名 --file 导入数据的地址
	./bin/mongoimport -d mall -c users  --file ./dumall-users

	# 导入
	./bin/mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db mall --collection users  --file ./dumall-users
	
	./bin/mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db mall --collection goods  --file ./dumall-goods
```

_错误提示： Unrecognized field 'snapshot'  本机mongoexport与服务器mongo版本不匹配_

## 部署


```bash
scp -r ./mall root@139.199.99.154:/home/nodejs
npm i  # 安装依赖
npm run build  # 打包前端项目到server/dist
npm run mall   # 运行 mall 项目 or node server/app.js
pm2 start server/app.js --watch --name="mall"
```
