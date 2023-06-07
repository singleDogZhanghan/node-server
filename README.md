# node-server

## 打包项目

```
npm run build
```

## 发布npm

```
npm publish
```

## 打包镜像

```
基于本地文件
docker build -t node-server:local . -f Dockerfile-local

基于npm仓库
docker build -t node-server:remote . -f Dockerfile-remote
```

## 启动容器

```
基于本地文件
docker-compose up -d node-server:local

基于npm仓库
docker-compose up -d node-server:remote
```

