const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const st =
  '<section class="section-tasks" id="tasks"><div class="task"><div class="task__icon"><span></span></div><p class="task__text"><strong>Full-Stack Development: </strong>I am capable of building full-stack websites and applications, readyto use with a functional front and back-end. I can deploy andmaintain these web applications.</p></div></section>';

const createDom = (html) => {
  const { document } = new JSDOM(html).window;
  return document;
};

class TreeNode {
  constructor(tag, parent) {
    this.tag = tag;
    this.children = [];
    this.parent = parent;
  }

  addChild(child) {
    this.children.push(child);
  }
}

const buildGraphTree = (node) => {
  const tag = node.tagName;
  const treeNode = new TreeNode(tag, node.parentNode);

  const childNodes = Array.from(node.childNodes);
  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i];
    if (childNode.nodeType === 1) {
      const childTreeNode = buildGraphTree(childNode);
      treeNode.addChild(childTreeNode);
    }
  }

  return treeNode;
};

const main = async () => {
  const document = createDom(st);

  const startingNode = document.documentElement;

  const graphTree = buildGraphTree(startingNode);
  console.log(graphTree);
};

main();
