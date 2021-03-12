# sylas-react-ui

[简体中文](./README_zh.md) / [English](./README.md)

## 简介

> 一个轻量的 React UI 组件库。基于 react hooks 和 Typescript。

[![NPM](https://img.shields.io/npm/v/sylas-react-ui.svg)](https://www.npmjs.com/package/sylas-react-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> ⚠️ 发布的这个包主要用于[个人项目](http://8.129.105.196:3333/blog)和 demo，且处于不稳定的早期阶段，API 可能变动。所以千万别用于生产环境。

**完整效果可参考：** [我的个人技术 blog](http://8.129.105.196:3333/blog)。

## 安装

```shell
# npm
npm install --save sylas-react-ui
```

```shell
# 或使用 yarn
yarn add sylas-react-ui
```

## 示例

**示例可访问 GitPage: [https://pb0710.github.io/sylas-react-ui/](https://pb0710.github.io/sylas-react-ui/)**

## 使用

首先，在你的项目 App 根组件添加 JSSBaseline。  
这是有必要的，因为这个库的**样式基于 jss** 实现。JSSBaseline 提供了基准样式和 jss 优先注入——让你给 UI 组件添加的自定义 className 优先级高过 jss 默认样式。用来自定义 UI 组件样式。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { JSSBaseline } from 'sylas-react-ui'

ReactDOM.render(
  <React.StrictMode>
    <JSSBaseline>
      <App />
    </JSSBaseline>
  </React.StrictMode>,
  document.getElementById('root')
)
```

然后，可以从 sylas-react-ui 引入 UI 组件。

```tsx
import React, { Component } from 'react'
import { Button } from 'sylas-react-ui'

function Example() {
  return <Button>Click here</Button>
}
```

### UI 组件列表

- JSSBaseline —— 基准样式
- Button —— 按钮
- Button.Icon —— 图标按钮
- Collapse —— 展开面板
- Divider —— 分割线
- Form —— 表单
- Form.Item —— 表单域
- Input —— 输入框
- Input.Textarea —— 多行输入框
- Input.Group —— 输入框组
- Select —— 下拉框
- Select.Option —— 下拉选项
- Switch —— 开关
- CheckBox —— 多选
- CheckBox.Group —— 多选组
- Radio —— 单选
- Radio.Group —— 单选组
- List —— 列表
- List.Item —— 列表项
- Loading —— 加载中
- Loading.Bounce —— 加载样式 1
- Loading.Line —— 加载样式 2
- Menu —— 菜单
- Menu.Sub —— 子菜单组
- Menu.Item —— 菜单项
- Tabs —— 顶部标签
- Tabs.Panel —— 标签面板项
- Paper —— 纸片
- GroundGlass —— 毛玻璃卡片
- Popup —— 弹出面板
- Progress —— 进度条
- Tag —— 标签
- TouchRipple —— 水波纹效果

### props API

props API 列表暂时还未整理出来。
目前，只能从源码中查看。

### hooks API

确保你已安装 react 和 react-dom v16.8 以上版本。否则无法使用 hooks API。

- Form.useForm
- Popup.usePopup
- TouchRipple.useRipple

## Github 地址和文档

- github: [https://github.com/pb0710/sylas-react-ui](https://github.com/pb0710/sylas-react-ui)
- npm: [https://www.npmjs.com/package/sylas-react-ui](https://www.npmjs.com/package/sylas-react-ui)

## License

MIT © [pb0710](https://github.com/pb0710)
