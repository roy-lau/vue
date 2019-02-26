# mall

## mongodb 导入数据

```bash
	mongoimport -d 数据库名 -c 文档名 --file 导入数据的地址
	./bin/mongoimport -d mall -c users  --file ./dumall-users
```


## 部署


```bash
scp -r ./mall root@139.199.99.154:/home/nodejs
npm i  # 安装依赖
npm run build  # 打包前端项目到server/dist
npm run mall   # 运行 mall 项目 or node server/app.js
pm2 start server/app.js --watch --name="mall"
```
