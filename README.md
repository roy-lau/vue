# 部署流程

下载vue部署分支，通过vue部署分支 下载各个分支的项目

[pm2配置文件](pm2.config.js)

```bash
git clone git@github.com:roy-lau/vue.git --depth=1 -b deploy vue-project-deploy # 下载vue部署分支
cd vue-project-deploy
sudo ./git-clone.sh

pm2 start pm2.config.js
```