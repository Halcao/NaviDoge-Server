# NaviDoge-Server

## 数据库相关

1.后台开启 mongodb 数据库 

`mongod -f /etc/mongod.conf --fork --logpath=/var/log/mongodb/log.log &`

其中 `/etc/mongod.conf`中指定了数据库路径 /var/lib/mongodb 和 bindIP = 127.0.0.1 即只可以由本机访问，建议部署时采用这个方法打开数据库。

2.前台开启数据库

`mongod --dbpath /var/lib/mongodb --bind_ip 10.141.14.47`

其中 bind_ip 为本机内网地址，开启后外部可以访问数据库，用于数据操作和本地调试。

3.关闭数据库

`sudo killall -15 mongod`

4.重启数据库

`sudo service mongod restart`

5.开启adminMongo

在adminMongo路径下`npm start`

## 服务端相关

 1. forever 是一个持久化运行的工具

```shell
# 首先 cd 到项目目录
# 开启服务
forever start -a -l forever.log -o out.log -e err.log app.js
# 停止服务
forever stop app.js
# 重启服务
forever restart -a -l forever.log -o out.log -e err.log app.js
```

使用 forever 会将日志输出到文件中，调试时建议直接使用

`node app.js`

## 数据相关

来自 Matlab 的数据想要转换到数据库中，需要先转换成 JSON 。这里有一个 Matlab 的 Toolbox：

[JSONlab: a toolbox to encode/decode JSON files](http://cn.mathworks.com/matlabcentral/fileexchange/33381-jsonlab--a-toolbox-to-encode-decode-json-files?requestedDomain=true)

Usage：

```matlab
savejson(obj)
# obj 为欲转换的对象
```
