const axios = require('../api/utils/axios.js'),
  { writeFile, writeFileSync } = require('fs')

// let id = 000000; //4161173

const sleep = (ms) => { new Promise((resolve) => setTimeout(resolve, ms)) }


let arr = []
for (var i = 0; i < 999999; i++) {
  (function(i) {
    setTimeout(function() {
      axios.get('http://cp-tools.cn/auth/verify?uid=' + i).then(({ status, data }) => {
        if (status === 200) {
          console.log(i, data);
          data.uid = i;
          arr.push(data)
          writeFileSync('./data.json', JSON.stringify(arr), (err) => {
            if (err) console.error(err)
          })

        }

      })
    }, (i + 1) * 1000);
  })(i)
}
