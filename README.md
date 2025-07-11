# ActionFlowEditor

<action-flow-editor> - 基于Flowgram.ai 封装的动作流 Web Component 设计器

直接在网页中嵌入交互式流程图！ 本组件将 Flowgram.ai 固定布局封装为轻量级动作流 Web Component，无需 iframe 即可无缝集成到现代前端项目中。

## 开发指南

1. 安装依赖
```
npm install
```
2. 构建min.js文件
```
npm run build
```
3. 将min.js文件引入到项目中
```html
<script src="action-flow-editor.min.js"></script>
```
4. 在任意位置使用
```html
<!-- 在任意位置使用 -->
<action-flow-editor [config]="config" [initialData]="initialData"></action-flow-editor>
```
### 基础配置
| 属性名        | 类型                      | 默认值    | 说明                                                                           |
| ------------- | ------------------------- | --------- | ------------------------------------------------------------------------------ |
| background    | boolean                   | true      | 是否显示背景                                                                   |
| readonly      | boolean                   | false     | 是否只读模式                                                                   |
| defaultLayout | string                    | 未指定    | 默认布局方式，可选值：`'vertical-fixed-layout'` 或 `'horizontal-fixed-layout'` |
| constants     | object (ConstantKeys)     | undefined | 样式常量配置，用于覆盖默认样式                                                 |
| langs         | { [key: string]: string } | undefined | 多语言配置对象，用于覆盖默认文本                                               |
### 回调函数
以下是可用的生命周期与事件回调：
#### `onInit(ext: any) => void`
- **触发时机**：组件初始化完成后调用。
- **参数**：
- `ext`: 扩展对象（具体类型由组件内部实现决定，可能提供一些内部方法或属性）
- **示例**：
```javascript
config: {
    onInit: (ext) => {
    console.log('组件已初始化', ext);
    }
}
```
#### `onchange(data: FlowNodeJSON | any, opt: { type: string, value: any }) => void`
- **触发时机**：当节点数据发生变化时触发（添加节点、移动节点、删除节点、修改表单值等）。
- **参数**：
- `data`: 变化后的节点数据（整个流程图数据或特定节点数据，根据操作不同可能不同）
- `opt`: 操作信息对象，包含操作类型和操作相关的值。
    - `type`: 操作类型，可能的值有：`'addFromNode'`, `'addBlock'`, `'moveChildNodes'`, `'deleteBlock'`, `'changeFormValues'`。
    - `value`: 操作相关的详细信息，具体结构根据操作类型不同而不同（见接口注释）。
- **示例**：
```javascript
config: {
    onchange: (data, opt) => {
    console.log('操作类型:', opt.type);
    console.log('操作详情:', opt.value);
    console.log('当前数据:', data);
    }
}
```
#### `onDispose() => void`
- **触发时机**：组件销毁时触发。
- **示例**：
```javascript
config: {
    onDispose: () => {
    console.log('组件已被销毁');
    }
}
```
#### `beforeAdd(addProps: FlowNodeJSON) => FlowNodeJSON`
- **触发时机**：在添加节点之前调用。可以通过此函数修改要添加的节点数据。
- **参数**：
- `addProps`: 要添加的节点数据（根据添加操作的类型，可能是一个节点对象）
- **返回**：修改后的节点数据，将使用返回的数据进行添加操作。
- **示例**：
```javascript
config: {
    beforeAdd: (node) => {
        // 给新节点添加一个默认标题
        node.data.title = '新节点';
        return node;
    }
}
```

## 配置示例
组件支持通过 `config` 属性传入配置对象。配置对象包含以下属性：
**设置方式：**
```html
// 完整配置示例
const advancedConfig = {
  background: false,
  readonly: true,
  defaultLayout: 'vertical-fixed-layout',
  langs: {
    'node.start': '开始节点',
    'node.end': '结束节点'
  },
  onInit: (ext) => {
    console.log('画布已加载', ext.canvas);
  },
  onchange: (data, opt) => {
    if (opt.type === 'deleteBlock') {
      alert(`节点 ${opt.value.data.id} 已被删除`);
    }
  },
  beforeAdd: (node) => {
    // 自动生成节点标题
    return {
      ...node,
      data: { 
        title: `节点-${Date.now().toString(36)}` 
      }
    };
  }
};
```