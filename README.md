##设置环境变量，evertpl 依赖此环境变量
NODE_ENV=development

##版本说明
nodejs 0.10.38
socket.io 1.3.5
uglify-js 1.3.5

##本地启动项目步骤
###1. 安装所有 package.json中的依赖包
```shell
npm install
```
###2. 等上一步中所有包安装完毕，执行
```shell
npm install coffee-script -g
```
###3. 执行启动脚本
```shell
cake dev
```
###4. 观察终端日志是否有 npm 依赖报错，如有请执行
```shell
npm install some-npm-package
```

##发布项目到线上
###1. 提交代码，举个栗子（步骤可省）
```shell
git status （查看改动）
git add -a（没有问题直接stage）
git commit -m 'build'（提交）
git pull（同步远端改动，可能会有合并）
git status（查看合并后是否有冲突）
git push （推送到远端）
```
###2. 编译，默默等待吧
```shell
cake pro/test //正式发布cake pro，测试发布cake test
```
###3. 重复步骤1
###4. 通过项目对应线上机器域名，不清楚项目线上域名的同学，询问上级，登陆线上机器，如果没有密码，向上级申请密码，如：
```shell
ssh root@nuoya.591ku.com
```
###5. 到对应目录拉代码，如：
```shell
cd /mydata/project/node_app/moirai
git pull
```
###6. 重启forever 下的该项目，forever_app_name 为项目/forever.sh中的--uid 对应的值：
######项目已经启动，更新代码重启
```shell
forever restart forever_app_name
```
######首次启动项目
```shell
sh  forever.sh
```
###说明. 步骤5，6都在线上机器上运行，步骤1，2，3，4在本地运行

##待优化的问题
- bigpipe view延迟到达
- 行内css 问题，行内css 在浏览器中延迟渲染
- 前后端模板通用

##静态资源引用问题
- CSS采用常规的标签引用和动态创建标签引用
- JS采用常规的标签引用和requirejs引用（目前常规引用可以使用fis解决md5的问题，但是requirejs内部的规则——路径计算，依赖关系，需要r.js来解决
- MD5, baidu-fis has MD5 all files
- 前后端组件化的问题
- FIS3，FIS插件，按需MD5
- 编译采用依赖编译，所有的所有的JS，都是用过模版文件外链，或requirejs引用的，但是所有的入口都以模版中外链的文件为准，这是毫无疑问的，因此先分析出模版文件，然后去寻找这些文件的全部依赖就可以了，把压缩打开，map.json 需要再次压缩

# node-bigpipe
