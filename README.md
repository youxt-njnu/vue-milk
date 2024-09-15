# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# 操作

## 安装

npm create vite@latest ./

mpm i pinia

npm i vue-router@next (@next保证安装的是针对的vue3的)

npm i vuetify@next

npm i @vueuse/core

如果你正在使用 Vue 3 并广泛使用 Composition API，那么 VueUse 库将非常有用。它可以帮助你处理许多常见的 UI 相关逻辑，而不需要重新发明轮子，从而加快开发速度和提高代码质量。

主要的函数和功能：
useMouse：跟踪鼠标位置的响应式状态。
useLocalStorage：响应式地与 localStorage 交互。
useFetch：一个用于执行 HTTP 请求并响应式地处理结果的函数。
useInterval、useTimeout：定时器相关的响应式操作。
useTitle：动态修改页面标题。

npm i sass --save-dev

在使用 Vite 构建的项目中，确实有对 Sass 的内置支持，但这并不意味着 Sass 的所有依赖都预先配置好了。Vite 通过其插件系统和内置的构建工具（如 esbuild 和 rollup）提供了对多种预处理器，包括 Sass 的支持。

尽管 Vite 提供了对 Sass 的支持，你通常还需要手动安装 sass（之前称为 node-sass）包，以使其转译 Sass/SCSS 文件。sass 是 Dart Sass 的 JavaScript 版本，它是目前推荐的 Sass 实现。

## 配置和使用

配置vite.config.js: 设置alias, @


### 1. Pinia

安装完 Pinia 后， 在 `src` 目录下创建一个 `stores` 文件夹，并在其中创建你的第一个 store。例如，创建一个 `mainStore.js` 文件：

```javascript
// src/stores/mainStore.js
import { defineStore } from 'pinia'
export const useMainStore = defineStore('mainStore', {
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++
    }
  }
})
```

在你的主 Vue 文件（通常是 `main.js` 或 `main.ts`）中导入 Pinia 并将其挂载到 Vue 应用：
   ```javascript
   import { createApp } from 'vue'
   import { createPinia } from 'pinia'
   import App from './App.vue'

   const app = createApp(App)
   const pinia = createPinia()

   app.use(pinia)
   app.mount('#app')
   ```

### 2. Vue Router

1. 在 `src` 目录下创建一个 `router` 文件夹，并在其中创建 `index.js`：
   ```javascript
   // src/router/index.js
   import { createRouter, createWebHistory } from 'vue-router'
   import Home from '../views/Home.vue'

   const routes = [
     {
       path: '/',
       name: 'Home',
       component: Home
     },
     // 更多路由...
   ]

   const router = createRouter({
     history: createWebHistory(import.meta.env.BASE_URL),
     routes
   })

   export default router
   ```

2. 在 `main.js` 或 `main.ts` 中导入并使用 router：
   ```javascript
   import { createApp } from 'vue'
   import App from './App.vue'
   import router from './router'
   import { createPinia } from 'pinia'

   const app = createApp(App)
   const pinia = createPinia()

   app.use(pinia)
   app.use(router)
   app.mount('#app')
   ```

### 3. Vuetify

**配置 Vuetify**：

1. Vuetify 需要在项目中全局配置。首先确保在 `main.js` 或 `main.ts` 中导入并初始化 Vuetify：
   ```javascript
   // src/main.js
   import { createApp } from 'vue'
   import App from './App.vue'
   import vuetify from '@/theme/ui/vuetify'

   const app = createApp(App)

   app.use(vuetify)

   app.mount('#app')
   ```

2. 安装图标字体

npm install material-design-icons-iconfont -D


3. 在 `src/plugins/vuetify.js` 中配置 Vuetify（如果没有这个文件，你需要创建它）：
   ```javascript
   // src/plugins/vuetify.js
   import { createVuetify } from 'vuetify'
   import * as components from 'vuetify/components'
   import * as directives from 'vuetify/directives'
   import { aliases, md } from 'vuetify/iconsets/md'
   import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure your project is capable of handling css files
   import 'vuetify/styles'  // 确保导入 Vuetify 样式

   const vuetify = createVuetify({
      components,
      directives,
      icons: {
        defaultSet: 'md',
        aliases,
        sets: {
          md,
        },
      },
     // 任何配置选项...
   })

   export default vuetify
   ```

### 4. Sass

Sass 已经安装好了，你可以直接在你的 Vue 组件的 `<style>` 标签中使用它，通过添加 `lang="scss"` 或 `lang="sass"`：
```vue
<style lang="scss">
$color: red;

.example {
  color: $color;
}
</style>
```
在全局的 `style.scss` 文件中定义内容时，通常包括那些需要在整个项目中重用的样式规则，这样可以保证样式的一致性，并简化后续的样式开发工作。以下是一些常见的内容和建议，你可以根据项目需求来调整：

1. **颜色定义**
   - 定义项目中常用的颜色变量，这有助于维护和更改颜色主题。

2. **字体定义**
   - 设置全局字体样式，包括字体族、大小、行高等。

3. **重置样式**
   - 包括一些基本的重置样式，确保各浏览器渲染元素的一致性。

4. **混合指令 (Mixins)**
   - 创建可重用的 CSS 代码块，以便在多个位置应用相同的样式，如媒体查询、按钮样式等。

5. **全局辅助类**
   - 定义一些常用的辅助类，比如文本对齐、显示隐藏等。

6. **布局和网格系统**
   - 如果不使用现成的框架，你可以定义自己的网格系统或布局规则。

7. **响应式工具**
   - 定义响应式工具和变量，方便全局使用。

将这些基础样式组织好，不仅有助于保持样式的一致性，还能提高开发效率。根据项目的规模和复杂度，你可以适当添加或删除某些定义，以满足项目需求。

### 4.jsconfig.json

在 Vue 或任何 JavaScript 项目中，`jsconfig.json` 文件是用于配置 JavaScript 项目的根目录设置，尤其是在使用像 Visual Studio Code 这样的编辑器时。这个文件帮助编辑器和其他工具理解项目的结构，提供更好的代码导航和智能感知（自动完成）。

1. **提升代码智能感知**：
   - `jsconfig.json` 文件使编辑器能够提供更准确的自动补全、代码跳转、引用搜索等功能。

2. **定义项目的根目录**：
   - 在大型项目中，定义一个项目的根目录可以帮助工具更好地索引和处理文件。

3. **自定义编译选项**：
   - 它可以指定用于编译项目的 ECMAScript 版本，如 ES6、ES7 等。

4. **路径别名支持**：
   - 如果你在项目中使用路径别名（如 `@` 用于引用 `src` 目录），`jsconfig.json` 可以配置这些别名，使得编辑器能够理解并正确解析。


下面是一个基本的 `jsconfig.json` 文件示例，它设置了项目的编译选项和包含的文件：

```json
{
  "compilerOptions": {
    "target": "es6",        // 设置 ECMAScript 目标版本
    "module": "esnext",     // 使用模块化标准
    "baseUrl": ".",         // 基础目录是当前目录
    "paths": {
      "@/*": ["src/*"]      // 设置 @ 为 src 目录的别名
    }
  },
  "include": [
    "src/**/*"             // 包括 src 目录下的所有文件
  ],
  "exclude": [
    "node_modules",        // 排除 node_modules 目录
    "**/*.spec.js"         // 排除所有测试文件
  ]
}
```
- **在 VS Code 中**：
  - VS Code 会自动检测到 `jsconfig.json` 文件，并根据它配置的内容提供代码智能提示和其他编辑功能。

- **在其他开发工具中**：
  - 虽然主要是为 VS Code 设计的，但其他支持 JavaScript 项目的编辑器或工具（如 WebStorm 或 Atom）也可能利用这个文件的某些配置。

如果你的项目足够简单，可能不需要 `jsconfig.json` 文件。但如果你的项目结构复杂，或者使用了模块化和路径别名，创建一个 `jsconfig.json` 文件会显著改善开发体验。


## router

router/index.js
通过meta存信息，通过scrollBehaviour保存上次滚动位置
``` js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Home', icon: 'Home' }
  },
  ......
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
```

在 Vue.js 中使用 vue-router 时，createWebHistory 是用来创建基于 HTML5 History API 的路由模式的函数。这种路由模式允许你创建一个没有哈希 (#) 符号的正常路径，这让 URL 看起来更美观，更符合传统的 URL 格式，并且更有利于搜索引擎优化（SEO）。

1. 无哈希 URL: 使用 createWebHistory 创建的路由不会在 URL 中使用哈希（#），而是直接使用 URL 路径。这样的 URL 更易于用户理解和分享。
2. 利用 HTML5 History API: 它利用 HTML5 的 History API 来完成页面的前进和后退，而不会重新加载页面。这为用户提供了更流畅的页面导航体验。
3. 服务器配置要求: 由于所有路由都是直接通过 URL 访问的，服务器必须正确配置以支持前端路由。即所有路由请求都应该重定向到你的 Vue 应用的入口文件（通常是 index.html），由 Vue-router 接管后续路由的管理。
4. SEO 友好: 由于 URL 中不包含哈希，这种方式更有利于页面的 SEO。


App.vue
需要在App.vue里加上 `<RouterView />`之后才能呈现出跳转的效果

``` vue
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
```

## navbar

使用实习的页面逻辑

## home

使用实习的页面逻辑

## mapbox加入

npm install mapbox-gl


# 知识点

## node:url

关联文档：https://nodejs.cn/api/url.html#new-urlinput-base

`node:url` 是 Node.js 中的一个模块，用于处理和转换 URL。这个模块提供了一些工具，如 `URL` 类和 `fileURLToPath` 函数，帮助你在 Node.js 应用中管理 URL。

- `URL` 类用于解析和构造 URL。
- `fileURLToPath` 函数用于将 file URL 转换为文件路径。

```
const myURL = new URL('/foo', 'https://example.org/');
// https://example.org/foo
```

```
url.fileURLToPath(url[, options])

url <URL> | <string> 要转换为路径的文件网址字符串或网址对象。
options <Object> : windows <boolean> | <undefined> 如果 path 应作为 Windows 文件路径返回，则为 true；对于 posix，则返回 false；对于系统默认值，则返回 undefined。默认值：undefined。
返回：<string> 完全解析的特定于平台的 Node.js 文件路径。

此函数可确保正确解码百分比编码字符，并确保跨平台有效的绝对路径字符串。
```

这个模块是 Node.js 的一部分，所以你不需要额外安装。只需确保你的 Node.js 版本支持这个模块。`node:url` 从 Node.js v10.0.0 开始可用，但某些特定的功能可能需要更高版本。如果你已经在使用比较新的 Node.js 版本，可以直接在你的代码中引用和使用这个模块。

1. **`import.meta.url`**：
   - 在 ES 模块中，`import.meta` 是一个对象，它提供了当前模块的元数据。`import.meta.url` 是这个对象的一个属性，它返回一个字符串，这个字符串表示当前模块文件的完整 URL。如果你的代码是在本地执行，这个 URL 的协议将是 `file://`，后面跟着文件的完整路径。

2. **`new URL('./src', import.meta.url)`**：
   - 这是创建一个新的 `URL` 对象，第一个参数 `./src` 是相对路径，第二个参数 `import.meta.url` 是基础 URL。这里的作用是基于当前模块的 URL 创建一个指向 `src` 目录的新 URL。

3. **`fileURLToPath(new URL('./src', import.meta.url))`**：
   - `fileURLToPath` 函数用于将 `file://` URL 转换为对应的文件系统路径。因此，这个函数调用将上面创建的 `URL` 对象转换成一个本地文件系统路径，这个路径指向模块所在目录的 `src` 子目录。

4. **`'@': fileURLToPath(new URL('./src', import.meta.url))`**：
   - 这通常出现在配置文件中，例如 Webpack 或 Vite 的别名配置。这里，`'@'` 是一个别名，它被映射到 `src` 目录的路径。在项目中，你可以使用 `@` 来代替完整的路径引用 `src` 目录下的文件，使得路径引用更简洁易读。

总之，这段代码的目的是设置一个路径别名 `@`，让你可以更方便地引用项目中 `src` 目录下的文件，而不需要每次都写出完整的相对路径。这样做可以提高代码的可维护性和可读性。

## vite

https://vitejs.cn/vite3-cn/guide/features.html

如果使用的是单文件组件，可以通过 <style lang="sass">（或其他预处理器）自动开启。

Vite 为 Sass 和 Less 改进了 @import 解析，以保证 Vite 别名也能被使用。另外，url() 中的相对路径引用的，与根文件不同目录中的 Sass/Less 文件会自动变基以保证正确性。

由于 Stylus API 限制，@import 别名和 URL 变基不支持 Stylus


## vuelidate有什么作用

Vuelidate 是 Vue.js 的一个轻量级和简便的表单验证库，它提供了一种简单而强大的方法来处理表单验证。Vuelidate 的主要特点和作用包括：

声明式验证规则：Vuelidate 允许你以声明式的方式定义验证规则，这些规则是响应式的，可以自动跟踪输入的改变并重新验证。

模型无关性：Vuelidate 不依赖于 V-model 或任何特定的数据结构，这使得它在处理复杂表单和嵌套数据时更灵活。

组合验证器：提供了多种内置验证器（如 required、minLength、maxLength 等），并支持自定义验证器，这些验证器可以很容易地组合使用，提供复杂的验证逻辑。

异步支持：支持异步验证，这对于需要服务器验证的场景（如检查用户名是否已存在）特别有用。

无侵入性：Vuelidate 的验证逻辑与 UI 逻辑分离，你可以将验证规则维护在组件的逻辑部分，而不需要改变模板结构。

多表单管理：适用于单个表单和多表单管理，易于扩展，可以轻松应对复杂的表单场景。

使用 Vuelidate 可以使表单验证逻辑更清晰、代码更整洁，并且可以大大减少处理表单验证时的样板代码。对于大多数基于 Vue.js 的应用来说，它是一个非常有用的库，特别是在需要进行详细的用户输入验证时。如果你正在使用 Vue 3，你应该查看 Vuelidate 的最新版本，它已经为支持 Vue 3 的应用进行了优化。


## material design是什么

Material Design 是由 Google 开发的设计语言，首次亮相于 2014 年，目的是提供一套综合的设计系统，能够在多个平台和设备上提供一致的用户体验。Material Design 强调使用基于现实世界的视觉线索的设计元素，如阴影、运动和深度效果，来创建更加直观和易于交互的用户界面。

Material Design 的主要特点包括：
响应式交互：Material Design 使用动效来提供用户行为的反馈，例如触摸或点击按钮时的涟漪效果。

布局和网格系统：它采用灵活的网格布局来建立一致和有条理的结构，确保内容在不同设备上的显示效果一致。

光影和深度：通过使用阴影和光照效果，Material Design 创建层次感，模拟物理世界的光照和阴影，增强用户界面的直观感。

色彩和图像：鼓励使用大胆的、饱和的颜色来吸引用户的注意力，并通过图像和图标来传达清晰的视觉信息。

组件和图标：Material Design 提供了一系列预设计的组件和图标，包括按钮、选择框、导航栏等，这些都是为了提高开发效率和保持界面的一致性。

应用场景
Material Design 被广泛应用于 Web 和移动应用程序中，尤其是在 Android 应用开发中。Google 自家的许多应用程序，如 Gmail、Google Maps 和 Google Photos 等，都采用了 Material Design。

开发工具
对于开发者和设计师，Google 提供了一套包含样式指南、组件和工具的资源，以帮助他们实现 Material Design 的规范。此外，还有基于 Material Design 的第三方 UI 组件库，如 Material-UI（针对 React）、Vuetify（针对 Vue.js）等，这些工具库可以帮助开发者更快地集成和使用 Material Design。

## vuetify里使用material design 图标


使用 Vuetify 时，集成和使用 Material Icons 非常便捷，因为 Vuetify 已经为 Material Design 图标提供了内置支持。你可以直接在 Vuetify 的 Vue 组件中使用这些图标，而不需要额外的安装或配置。

这里是如何查找和使用这些图标名称的步骤：

1. 访问 Material Icons 图库

你可以通过 Google 的 [Material Icons 官方网站](https://material.io/resources/icons/) 查看所有图标。这个网站提供了一个用户友好的界面，可以浏览和搜索不同的图标。

 2. 使用搜索功能

如果你有特定图标的需求，可以使用图库顶部的搜索框来查找。例如，输入 "home" 将显示所有与家相关的图标。

3. 选择图标和获取名称

每个图标下都会显示其名称。这个名称是你在 Vuetify 的 `<v-icon>` 组件中需要使用的确切名称。例如，Material Icons 图库中的 "menu" 图标，你应该这样在 Vuetify 中使用：

```html
<v-icon>menu</v-icon>
```

4. 注意图标的类别

Material Icons 分为几种类别，如 Regular, Outlined, Rounded, Two-Tone, 和 Sharp。Vuetify 默认使用的是 Regular 类别，但如果你想使用其他风格的图标，你也可以在 Vuetify 中指定。例如，要使用 Outlined 风格的图标，你可以这样写：

```html
<v-icon>home_outlined</v-icon>
```

通过这些步骤，你可以轻松找到并使用任何你需要的 Material Icons 图标。确保选择适合你应用的风格，并通过 Vuetify 的 `<v-icon>` 组件来实现。

## scss mixin

在SCSS中，`mixin` 是一种功能强大的特性，用于创建可重用的代码片段，这些代码片段可以在多个样式表中包含。通过 `@mixin` 关键字定义，可以带有或不带有参数。使用 `@include` 指令在需要的地方引入这些 `mixin`。

解析给定的代码

1. `@mixin respond-to($media)`
这个 `mixin` 用于响应式设计，它根据不同的设备类型应用不同的 CSS 规则。参数 `$media` 指定了设备类型。

- **代码功能**: 根据传入的 `$media` 参数，应用适当的媒体查询规则。如果 `$media` 是 'phone'，则应用最大宽度为 600px 的媒体查询；如果是 'tablet'，则应用最大宽度为 900px 的媒体查询。
- **使用方法**: 使用 `@include respond-to('phone') { ... }` 来包含在宽度不超过 600px 的设备上应用的 CSS 规则。

2. `@mixin button-variant($bg-color)`
这个 `mixin` 用于快速创建具有统一样式和行为的按钮。参数 `$bg-color` 指定了按钮的背景颜色。

- **代码功能**: 设置按钮的背景颜色、文本颜色、内边距，并在悬停时将背景颜色加深10%。
- **使用方法**: 使用 `@include button-variant(red)` 来应用红色背景的按钮样式。

示例使用

```scss
.button {
  @include button-variant(blue);  // 应用蓝色按钮的样式
}

@media screen and (min-width: 600px) {
  .container {
    @include respond-to('phone') {
      padding: 20px;
    }
  }
}
```

在上述示例中，`.button` 类使用了 `button-variant` mixin 来设置为蓝色背景的按钮样式。`.container` 类中使用了 `respond-to` mixin 来对手机屏幕应用特定的样式。

在CSS中，`@media` 和 `@content` 是与媒体查询和SCSS mixins相关的两个不同的指令：

1. `@media`
`@media` 是一个CSS的原生特性，用于编写响应式的样式规则。它允许你根据不同的媒体特性（如设备的宽度、高度、分辨率等）应用不同的CSS规则。这是构建响应式网页设计的关键工具之一。

- **用途**: 使网站能够适应不同设备的屏幕尺寸和分辨率。
- **示例**:
  ```css
  @media (max-width: 600px) {
    body {
      background-color: lightblue;
    }
  }
  ```
  在这个示例中，只有当设备的屏幕宽度小于或等于600像素时，背景色才会变为浅蓝色。

### 2. `@content`
`@content` 是Sass（特别是SCSS语法）的一个特性，用于与`@mixin`指令结合使用。`@content` 允许你在包含 `@mixin` 的地方插入自定义的CSS内容。

- **用途**: 使 `@mixin` 更加灵活和可重用，因为你可以定义一个带有动态内容的样式块。
- **示例**:
  ```scss
  @mixin responsive {
    @media (max-width: 600px) {
      @content;
    }
  }

  .container {
    @include responsive {
      background-color: lightblue;
    }
  }
  ```

在这个示例中，`responsive` mixin 被定义为在屏幕宽度小于或等于600px时应用一些自定义CSS。`.container` 类使用这个 `mixin` 并在符合条件的情况下设置背景色为浅蓝色。总的来说，`@media` 是CSS中的一个标准特性，而 `@content` 是Sass（SCSS）中的一个特性，不是原生CSS的一部分。这两个指令在创建灵活且响应式的网页设计中扮演了重要角色。

在SCSS中，`$breakpoints` 是一个包含多个键值对的映射（map），其中键代表断点的名称，值代表具体的像素值。这种方式可以集中管理媒体查询的断点，使得整个项目的响应式设计更为一致且易于维护。

`$breakpoints` 的定义和使用

你定义的 `$breakpoints` map 包括三个键值对，对应不同的屏幕宽度断点：

```scss
$breakpoints: (
  'small': 480px,
  'medium': 768px,
  'large': 1024px
);
```

你可以通过SCSS的 `map-get` 函数来访问这些值，并结合 `@mixin` 和 `@media` 来创建一个灵活的、可重用的媒体查询 mixin。

结合 `@mixin` 使用 `$breakpoints`

接下来，我们可以优化先前的 `respond-to` mixin，使其能够利用 `$breakpoints` map，从而简化代码并增加其灵活性：

```scss
@mixin respond-to($breakpoint) {
  $breakpoint-value: map-get($breakpoints, $breakpoint);

  @if $breakpoint-value {
    @media (max-width: $breakpoint-value) {
      @content;
    }
  } @else {
    @warn "No breakpoint defined for `#{$breakpoint}`.";
  }
}
```

现在，这个 `respond-to` mixin 可以这样使用：

```scss
.container {
  width: 100%;

  @include respond-to('small') {
    width: 80%;
  }

  @include respond-to('medium') {
    width: 85%;
  }

  @include respond-to('large') {
    width: 90%;
  }
}
```

在这个例子中，`.container` 类的宽度会根据不同的屏幕宽度进行调整。`@include respond-to('small')` 会在屏幕宽度不超过 480px 时应用其内部的样式。

优势

- **维护性**: 将断点值集中在一个地方定义，当需要调整断点时，只需修改 `$breakpoints` map，而不需在多处代码中手动修改。
- **可扩展性**: 通过map和mixin的组合，可以轻松添加更多的断点或修改现有断点，而不会破坏现有的实现。
- **错误处理**: 增加了一个 `@warn` 指令，如果尝试使用未定义的断点，它会发出警告。

这种方法的使用提高了代码的重用性和灵活性，并使得管理响应式布局变得更加简单和直观。

## vuetify 响应式

在 Vuetify 中进行响应式设计涉及利用其内建的栅格系统、断点服务和隐藏/显示类等工具。Vuetify 设计响应式界面的方式很直观，主要基于 Vue 组件和特定的响应式 props。下面，我将介绍一些常用的方法和实践：

1. 使用栅格系统

Vuetify 的栅格系统基于 Flexbox 构建，它包括行（`v-row`）和列（`v-col`）组件，这些组件具有不同的 prop，可以定义在不同断点下的行为。

```vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <!-- 在手机上全宽，在平板及以上设备上占一半宽 -->
        <div>Item 1</div>
      </v-col>
      <v-col cols="12" md="6">
        <!-- 同上 -->
        <div>Item 2</div>
      </v-col>
    </v-row>
  </v-container>
</template>
```

2. 断点服务（Breakpoint Service）

Vuetify 提供一个全局的断点服务，允许你在 JavaScript 中根据当前屏幕大小的断点来调整应用的行为。这可以通过 `$vuetify.breakpoint` 对象访问。

```vue
<template>
  <div>
    <v-toolbar :flat="$vuetify.breakpoint.mdAndDown">
      <!-- 在中等尺寸及以下设备使用扁平样式 -->
    </v-toolbar>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('Current breakpoint:', this.$vuetify.breakpoint.name);
  }
}
</script>
```

3. 显示/隐藏类

Vuetify 提供了一系列的工具类，可以在特定断点显示或隐藏内容。

```vue
<template>
  <div>
    <div class="d-none d-sm-flex"> <!-- 在小于600px宽度的屏幕上隐藏 -->
      This is visible on screens wider than 600px.
    </div>
    <div class="d-flex d-md-none"> <!-- 在大于960px宽度的屏幕上隐藏 -->
      This is visible on screens narrower than 960px.
    </div>
  </div>
</template>
```

4. 响应式属性

许多 Vuetify 组件提供响应式 props，使组件能够根据屏幕大小改变其参数。例如，`v-navigation-drawer` 组件可以根据屏幕大小自动隐藏或显示。

```vue
<template>
  <v-navigation-drawer :permanent="$vuetify.breakpoint.lgAndUp">
    <!-- 在大屏幕上始终显示，在小屏幕上隐藏 -->
  </v-navigation-drawer>
</template>
```


通过结合使用栅格系统、断点服务、显示/隐藏类以及组件的响应式属性，你可以在 Vuetify 中创建功能强大且视觉上吸引人的响应式布局。这些工具简化了响应式设计的过程，并使你能够更好地控制在不同设备上的用户体验。

## scrollBehavior(to, from, savedPosition)

to: 即将进入的目标路由对象。
from: 正在离开的路由对象。
savedPosition: 如果存在的话，这个参数会是一个对象，包含页面离开时的滚动位置（比如，通过浏览器的前进或后退按钮触发的）。

当返回 { top: 0 } 时，不管之前的滚动位置如何，每次路由导航后页面都会滚动到最顶部。这在很多应用中都是期望的行为，特别是在内容变化显著的页面导航时，确保用户总是从顶部开始查看新页面的内容。
返回 false

当返回 false 时，路由导航不会导致滚动行为改变。也就是说，页面会保持在当前滚动位置，不会自动滚动到顶部或任何其他位置。这种行为可能适用于那些希望用户在导航后能继续阅读或观看内容的场景，尤其是当内容更新不会显著改变页面结构的时候。

在 vue-router 中，savedPosition 是由浏览器自动提供的，它仅在浏览器的前进或后退操作发生时有效。这个机制是基于 HTML5 History API 的，使得用户在使用浏览器的前进或后退按钮时能够返回到之前的滚动位置。


当用户通过浏览器的前进或后退按钮导航时，vue-router 会尝试恢复到之前页面的滚动位置。这是通过 HTML5 History API 的 popstate 事件来实现的，该事件在浏览器历史记录条目更改时触发。


记录滚动位置：
当你离开一个路由时，如果你的浏览器支持 pushState 和 replaceState 方法（HTML5 History API 的一部分），vue-router 会记录当前的滚动位置

恢复滚动位置：
当用户通过前进或后退到达一个路由时，vue-router 会从历史记录中取出之前保存的滚动位置（savedPosition），并提供给 scrollBehavior 函数。

如果存在 savedPosition，你可以在 scrollBehavior 函数中使用这个值来决定页面应该滚动到的位置。





进度：
2. 参考的一个是crm的项目结构，一个是把之前写的新网站的首页加入到你的这个里面
3. 还是从下往上，继续写结构