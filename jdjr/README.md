# jdjr(京东金融)

(参考项目)[https://m.jr.jd.com/spe/qyy/main/index.html]
### 自适应 基本概念

* CSS像素，设备像素，逻辑像素，设备像素比

CSS像素（px）是设备像素（物理像素）。

设备像素比：设备像素与逻辑像素的比值，如1：2（一个设备像素等于两个逻辑像素）

* viewport

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0">
```

- width: 控制`viewport`的大小，可以设定的一个值，如 600，或者特殊的值，如 `device-width` 为设备的宽度（单位为缩放为 100% 时的 css 的像素）
- height: 和 `width` 相对应，指定高度。
- initial-scale: 初始缩放比例，也即是当页面第一次 load的时候缩放比例。
- maximum-scale: 允许用户缩放到的v最大比例。
- minimum-scale: 允许用户缩放到的最小比例。
- user-scalable: 用户是否可以手动缩放

### spa 设计工作原理

* history api

主要原理是使用了 `pushState`和`onpopstate`方法

示例： [history示例html](example/history.html)

* hash

hash方法主要是使用 `location.href`和`hashchange`方法

示例： [hash示例html](example/hash.html)
