# 下载

```bash
npm install @yogln/tree-traverser -D
```

# 使用方式

```typescript
const treeData = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        {value: 4, children: []},
        {value: 5, children: []},
      ],
    },
    {
      value: 3,
      children: [
        {value: 6, children: []},
        {value: 7, children: []},
        // { value: 8, children: [
        //     { value: 9, children: [] },
        // ] },
      ],
    },
  ],
};

traverseTree(treeData, (node, ctx) => {}, (options = {}));
```

# ctx

| Syntax  | Description  |
| ------- | ------------ |
| depth   | 层级         |
| index   | 索引         |
| parent  | 父节点       |
| parents | 父节点列表   |
| remove  | 移除节点     |
| replace | 替换节点     |
| break   | 停止遍历     |
| skip    | 跳过本次遍历 |

```typescript
traverseTree(
  treeData,
  (node, ctx) => {
    console.log(`Depth: ${ctx.depth}, Index: ${ctx.index}, Value: ${node.value}, ====before====`);
    // if (node.value === 5) {
    //     ctx.break(); // Stop traversing the tree
    // }
    if (node.value === 4) {
      return ctx.skip();
      // return ctx.break();
    }
    console.log(`Depth: ${ctx.depth}, Index: ${ctx.index}, Value: ${node.value}, ====after====`);
    // if (node.value === 6) {
    //     // ctx.break(); // Stop traversing the tree
    //     ctx.replace({
    //         value: 60,
    //     })
    // }
    // if (node.value === 5) {
    //     ctx.remove(); // Remove the node with value 5
    // }
  },
  {
    // order: 'post'
    // order: 'pre'
    order: 'bfs',
  }
);
```

# options

| Syntax | Description    |
| ------ | -------------- |
| pre    | 默认，前序遍历 |
| post   | 后序遍历       |
| bfs    | 层序遍历       |
