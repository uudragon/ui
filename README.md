# UI

## 准备

### 安装nodejs和ruby

- 安装[nodejs](http://www.nodejs.org/)
- 安装[ruby](http://rubyinstaller.org/)

### 安装nodejs和ruby组件

- 安装grunt和bower: `npm i -g grunt-cli bower`
- 安装compass和sass: `gem install compass sass`

### 安装App依赖包
cd 到根目录
```
npm install && bower install
```

## 运行
cd 到根目录
```
grunt serve
```

## 发布到服务器端
cd 到根目录
```bash
. uud.sh # 输入两次密码
```

## grunt相关命令

- 运行: `grunt serve`
- 编译: `grunt build`
- 编译并运行: `grunt serve:dist`

## 项目结构说明

模板引擎：[Jade](http://jade-lang.com/)

- 位置: app/jade
- app/jade/views对应app/views中的页面(不要直接编辑app/views中的html, 很可能会被覆盖)
- app/jade/module保存共用的模块和mixin

css预处理器: [sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)

- 位置: app/styles
- 目录结构和scss版的bootstrap类似,多数直接用的bootstrap的代码, 不过不少经过较深度的定制(bootstrap.js, bootstrap.scss都经过定制, 这是此app唯一一个经过定制的第三库)

javascript结构

- MainCtrl (main)是所有页面共用的controller
- 其余的带有Ctrl后缀的为一级子目录下共用的controller, 比如CustomerServiceCtrl (customer.js) 被页面checkorder, splitorder, complaints, customer-pool共用, 不带Ctrl后缀的controller, 如CheckOrder, SplitOrder, Complains, CustomerPool被各自页面独占.
- 以地址http://127.0.0.1:9000/#/manager/employee为例, 在这个地址中, manager说明对应相应的js文件为manager.js, controller为Employee
