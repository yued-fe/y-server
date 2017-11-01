# y-server

> 让启动Server更简单


## 安装

全局安装
```bash
npm install -g y-server
```

局部安装
```bash
npm install --save-dev y-server
```

## 使用

命令行用法
```bash
y-server [--config other-dir/y-server.config.js]
```

JS用法
```bash
const yServer = require('y-server');

// 普通模式
yServer({
  port: 8888,
  watch: [],
  plugins: [],
});

// 热启动模式
yServer.run('y-server.config.js');
```

## 配置

* `port` server 端口号
* `watch` 监听文件，支持字符串或者数据，支持[glob](https://github.com/isaacs/node-glob)语法
* `plugins` 插件集合，每一个插件是一个接收 express 实例的方法，例如：[y-server-cors](https://github.com/yued-fe/y-server-cors)
