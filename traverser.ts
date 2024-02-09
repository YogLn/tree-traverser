import {TreeNode, TraverserOptions, TraverserContext} from './type';

class TreeTraverser {
  data: TreeNode;
  callback: (node: TreeNode, ctx: TraverserContext) => void;
  options: TraverserOptions;
  shouldBreak: boolean;
  shouldSkip: boolean;
  pathKey: string;
  order: 'pre' | 'post' | 'bfs';

  constructor(
    data: TreeNode,
    callback: (node: TreeNode, ctx: TraverserContext) => void,
    options: TraverserOptions = {}
  ) {
    this.data = data;
    this.callback = callback;
    this.options = options;
    this.shouldBreak = false;
    this.shouldSkip = false;

    const {pathKey = 'children', order = 'pre'} = options;
    this.pathKey = pathKey;
    this.order = order;
  }

  traverseTree(): void {
    let shouldBreak = false;
    let shouldSkip = false;

    const visitNode = (
      node: TreeNode,
      depth: number,
      index: number,
      parent: TreeNode | null,
      parents: TreeNode[]
    ): TraverserContext => {
      const ctx: TraverserContext = {
        depth,
        index,
        parent,
        parents,
        remove: () => {
          if (parent) {
            parent[this.pathKey].splice(index, 1);
          }
        },
        replace: (newNode: TreeNode) => {
          if (parent) {
            parent[this.pathKey][index] = newNode;
          }
        },
        break: () => {
          shouldBreak = true;
        },
        skip: () => {
          shouldSkip = true;
        },
      };

      this.callback(node, ctx);

      return ctx;
    };

    const traverseNode = (
      node: TreeNode,
      depth: number,
      index: number,
      parent: TreeNode | null,
      parents: TreeNode[]
    ): void => {
      if (shouldBreak) {
        return;
      }

      if (this.order === 'pre' && !shouldSkip) {
        visitNode(node, depth, index, parent, parents);
      }

      if (node[this.pathKey]) {
        shouldSkip = false;
        for (let i = 0; i < node[this.pathKey].length; i++) {
          traverseNode(node[this.pathKey][i], depth + 1, i, node, parents.concat(node));
          if (shouldBreak) {
            return;
          }
        }
      }

      if (this.order === 'post' && !shouldSkip) {
        visitNode(node, depth, index, parent, parents);
      }
    };

    const traverseBFS = (): void => {
      const queue: {node: TreeNode; depth: number; index: number; parent: TreeNode | null; parents: TreeNode[]}[] = [
        {node: this.data, depth: 0, index: -1, parent: null, parents: []},
      ];

      while (queue.length > 0) {
        const {node, depth, index, parent, parents} = queue.shift()!;
        visitNode(node, depth, index, parent, parents);
        if (shouldBreak) {
          break;
        }
        if (node[this.pathKey]) {
          for (let i = 0; i < node[this.pathKey].length; i++) {
            queue.push({
              node: node[this.pathKey][i],
              depth: depth + 1,
              index: i,
              parent: node,
              parents: parents.concat(node),
            });
          }
        }
      }
    };

    if (this.order === 'bfs') {
      traverseBFS();
    } else {
      traverseNode(this.data, 0, -1, null, []);
    }
  }
}

export function traverseTree(
  data: TreeNode,
  callback: (node: TreeNode, ctx: TraverserContext) => void,
  options: TraverserOptions = {}
): void {
  const traverser = new TreeTraverser(data, callback, options);
  traverser.traverseTree();
}
