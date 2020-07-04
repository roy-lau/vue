module.exports = {
    "apps": [{
        "name": "app-music-mobile",
        "cwd": "./app-music-mobile",
        "script": "npm -- run dev",
        "node_args": "--harmony",
        "watch": true,
        "ignoreWatch": ["node_modules"],
        "log_date_format": "YYYY-MM-DD HH:mm:ss",
        "log_file": "../log/vue2.log",
        "error_file": "../log/vue2-err.log",
        "out_file": "../log/vue2-out.log",
        "pid_file": "../log/vue2.pid"
    },{
        "name": "fund-back",
        "cwd": "./fund-back/server",
        "script": "./server.js",
        "watch": true,
        "ignoreWatch": ["node_modules"],
        "log_date_format": "YYYY-MM-DD HH:mm:ss",
        "log_file": "../log/fund-back.log",
        "error_file": "../log/fund-back-err.log",
        "out_file": "../log/fund-back-out.log",
        "pid_file": "../log/fund-back.pid"
    },{
        "name": "fund-oracle",
        "cwd": "./fund-oracle/dist",
        "script": "hs -x ---'.' -p 3004",
        "watch": true,
        "ignoreWatch": ["node_modules"],
	// "instances"  : "max", // 运行当前主机的最大核心
        // "exec_mode": "cluster_mode", // 开启集群模式
        "log_date_format": "YYYY-MM-DD HH:mm:ss",
        "log_file": "../../log/fund-oracle.log",
        "error_file": "../../log/fund-oracle-err.log",
        "out_file": "../../log/fund-oracle-out.log",
        "pid_file": "../../log/fund-oracle.pid"
    },{
        "name": "jdjr",
        "cwd": "./jdjr/dist",
        "script": "hs -x ---'.' -p 3005",
        "watch": true,
        "ignoreWatch": ["node_modules"],
        "log_date_format": "YYYY-MM-DD HH:mm:ss",
        "log_file": "../../log/jdjr.log",
        "error_file": "../../log/jdjr-err.log",
        "out_file": "../../log/jdjr-out.log",
        "pid_file": "../../log/jdjr.pid"
    },{
        "name": "mall",
        "cwd": "./mall/server",
        "script": "app.js",
        "watch": true,
        "ignoreWatch": ["node_modules"],
        "log_date_format": "YYYY-MM-DD HH:mm:ss",
        "log_file": "../../log/mall.log",
        "error_file": "../../log/mall-err.log",
        "out_file": "../../log/mall-out.log",
        "pid_file": "../../log/mall.pid"
    },{
        "name": "mt-pc",
        "cwd": "./mt-pc",
        "script": "npm run start",
        "ignoreWatch": ["node_modules"],
        "log_date_format": "YYYY-MM-DD HH:mm:ss",
        "log_file": "../log/mt-pc.log",
        "error_file": "../log/mt-pc-err.log",
        "out_file": "../log/mt-pc-out.log",
        "pid_file": "../log/mt-pc.pid"
    }]
}
