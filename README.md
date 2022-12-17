# missyt-npm
> npm 源管理工具

## 开始使用
### 安装
```shell
# 安装成功后，生成全局命令 prm
npm install missyt-npm -g
```

### 查看可切换的源列表
> 展示可切换的源列表和对应源的访问延迟ms
```shell
prm ls

# ⏺ taobao https://registry.npmmirror.com/ (221ms)  
# ⏺ cnpm https://r.cnpmjs.org/ (367ms)  
# ⏺ tencent https://mirrors.cloud.tencent.com/npm/ (458ms)  
# ⏺ npm https://registry.npmjs.org/ (989ms)  
# ⏺ yarn https://registry.yarnpkg.com/ (1009ms)  
# ⏺ npmMirror https://skimdb.npmjs.com/registry/ (1268ms) 
```

### 切换npm源
```shell
prm use taobao
```

### 增加npm源
参数：
    - name 源的名称，例如:taobao
    - registryUrl 源地址 例如:https://registry.npmmirror.com/
    - homeUrl 主页地址，非必须 例如：https://npm.taobao.org/
```shell
prm add <name> <registryUrl> <homeUrl>
```

### 删除某个源
参数:
    - name 待删除的源名称
```shell
prm del taobao
```