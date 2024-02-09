export interface TreeNode {
  [key: string]: any;
}

export interface TraverserOptions {
  pathKey?: string;
  order?: 'pre' | 'post' | 'bfs';
}

export interface TraverserContext {
  depth: number;
  index: number;
  parent: TreeNode | null;
  parents: TreeNode[];
  remove(): void;
  replace(newNode: TreeNode): void;
  break(): void;
  skip(): void;
}
