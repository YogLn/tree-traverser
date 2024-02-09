import traverseTree from '../index';
describe('traverseTree', () => {
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

  traverseTree(
    treeData,
    (node, ctx) => {
      console.log(`Depth: ${ctx.depth}, Index: ${ctx.index}, Value: ${node.value}, ====before====`);
      if (node.value === 4) {
        return ctx.skip();
      }
      console.log(`Depth: ${ctx.depth}, Index: ${ctx.index}, Value: ${node.value}, ====after====`);
    },
    {
      order: 'bfs',
    }
  );
});
