# vue-components-demo

## Vue组件库项目模板

### 启动

```shell
npm install
npm run serve
```

### 打包发布

```shell
npm run version
npm run build 
npm publish
```

### 使用组件库

以下已vue-components作为名称，需要自行修改

```shell
npm install vue-components
```
#### 全量引用

```scss
//stye.scss
@import 'vue-components/styles/import';
@import 'vue-components/styles/base';
@import 'vue-components/styles/components';
```

```js
//main.js
import Component from 'vue-components'
import Vue from 'vue'
Vue.use(Component)
```
#### 按需引用

修改**babel.config.js**

```js
//使用babel-plugin-import来按需引用代码,如不需要可省略
module.exports = {
  ...
  plugins: [
      ...
      [
        'import',
        require('vue-components/babel-plugin-import-config')(),
      ]
  ],
}
```

```scss
//stye.scss
@import 'vue-components/styles/import';
@import 'vue-components/styles/base';
```

```js
//main.js
import {Header} from 'vue-components'
import Vue from 'vue'
Vue.use(Header.name,Header)
```