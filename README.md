# Ndigits

可视化展现A*算法解决八数码/十五数码问题的探索路径

基于Vue/TypeScript实现可视化，A*算法基于TypeScript。

A*算法位于[src/global.ts](https://github.com/kirakiseki/Ndigits/blob/main/src/global.ts)下，
`Line 51`行所示变量中。
```typescript
export const solve = ref<Function>(() => {...})
```

# 运行截图
![](https://s-gz-4165-image.oss.dogecdn.com/2022/10/21/截屏2022-10-21 22.03.43.png)

![](https://s-gz-4165-image.oss.dogecdn.com/2022/10/21/截屏2022-10-21 22.03.56.png)

# 运行

安装node环境后，全局安装包管理器pnpm
```bash
npm install -g pnpm
```
使用pnpm安装项目依赖
```bash
pnpm install
```
使用dev模式运行
```bash
pnpm dev
```
构建打包生成静态文件
```
pnpm build
```
生成的静态文件位于`dists/`下

# 使用技术

使用预包含Vue 3, Vite3, UnoCSS等的基础脚手架[Vitesse-lite](https://github.com/antfu/vitesse-lite)进行上层功能的开发。
