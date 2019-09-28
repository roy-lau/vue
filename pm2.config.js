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
        "instances"  : "max",
         "exec_mode": "cluster_mode",
        "log_date_format": "YYYY-MM-DD HH:mm:ss",
        "log_file": "../log/fund-back.log",
        "error_file": "../log/fund-back-err.log",
        "out_file": "../log/fund-back-out.log",
        "pid_file": "../log/fund-back.pid"
    }]
}