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
