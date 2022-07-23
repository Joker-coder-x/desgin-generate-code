# Design Generate Code

assets      静态相关资源
packages    提供用来拖拽的组件
platforms   平台相关的抽象API代码
compiler    编译器
generator   生成器

可用的组件库
提供自定义组件的接口
适配器？

## 什么是低代码平台？
1. 可视化操作, 拖拽生成页面 
2. 提供一些"Open API"
3. 低代码平台 === 无代码平台？
4. 可配置的样式接口
5. 一键生成可维护可读性强规范性强的"Source Code"
  a. 直接通过webpack等构建工具构建生成代码?
  b. 自己制定模板，然后通过算法去生成代码？
    1. 用户自己改动代码和自动生成的代码如何同步？
6. 蓝图系统（提供可视化逻辑编程接口）


## 布局容器
粘性布局
绝对定位布局
static布局
相对定位布局

然后拖拽的组件只能放置在布局容器里面



UI Event -> websocket -> Server -> Generate Code Files  -> vite/webpack -> rebuild  -> Update UI

.vue -> vueLoader -> webpack -> html/js/css
vnode -> 渲染同步 -> vnode

vnodes = [
  {
    type: {
      path: 'xxx',
      tag: 'el-button'
    },
    props: {
      default: () => 'text'
    },
    children: null,
    directives: null,
    slots: null
  },
  {
    type: 'p',
    props: {
      style: 'color: red',
     
    },
    directives: {
      "if": "xxx",
      "else": "xxx",
      default
    },
    slots: null,
    children: [
      'text',
    ]
  }
]


{
  "name": "xxx.vue",
  "template": "",
  "script": {
    lang: "ts",
    value: "import { defineComponent } from 'vue';

    export default defineComponent({
      name: "TestBoard",

      props: {
        color: String
      },

      setup() {
        
      },
    })"
  },
  "style": {
    lang: "css",
    scoped: true,
    value: "xxxx"
  }
}


古代的青铜器和铁器（冷兵器时代）：铜、锡、镍、铅、铁
第一次和第二次工业革命（石化时代）：氢、碳、氮、铁
第三次工业革命（信息时代）：硅
能源危机：锂、氟、钠、铀、钒