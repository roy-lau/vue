# mt-pc (美团网)

> 一个基于 vue + element-ui + ssr + koa2 + MongoDB 打造的美团网项目

### 创建项目

```bash
> npx create-nuxt-app mt  # 创建项目
npx: 379 安装成功，用时 48.542 秒
> Generating Nuxt.js project in /Users/roylau/dev/project/vue/project/mt
? Project name mt
? Project description My awesome Nuxt.js project
? Use a custom server framework koa
? Choose features to install Progressive Web App (PWA) Support, Axios
? Use a custom UI framework element-ui
? Use a custom test framework none
? Choose rendering mode Universal
? Author name roylau
? Choose a package manager yarn
```

### 导入数据

```bash

mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db 'mt-pc' --collection areas --type json --file ./areas.dat
mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db 'mt-pc' --collection category --type json --file ./category.dat
mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db 'mt-pc' --collection cities --type json --file ./cities.dat
mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db 'mt-pc' --collection maps --type json --file ./maps.dat
mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db 'mt-pc' --collection menus --type json --file ./menus.dat
mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db 'mt-pc' --collection pois --type json --file ./pois.dat
mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db 'mt-pc' --collection provinces --type json --file ./provinces.dat
mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db 'mt-pc' --collection regions --type json --file ./regions.dat
mongoimport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db 'mt-pc' --collection topsearches --type json --file ./topsearches.dat

mongoexport --host roylauDB-shard-0/roylaudb-shard-00-00-16ntu.mongodb.net:27017,roylaudb-shard-00-01-16ntu.mongodb.net:27017,roylaudb-shard-00-02-16ntu.mongodb.net:27017 --ssl --username dev --password toor --authenticationDatabase admin --db mall --collection goods --type json --out goods.json
```

### Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
