function getRandomInt(min, max) {
  return ~~Math.random() * (max - min + 1) + min
}
// 洗牌函数（生成随机播放列表）
export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
}
