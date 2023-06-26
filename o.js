const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const st =
  '<section class="section-tasks" id="tasks"><div class="task"><div class="task__icon"><span></span></div><p class="task__text"><strong>Full-Stack Development: </strong>I am capable of building full-stack websites and applications, readyto use with a functional front and back-end. I can deploy andmaintain these web applications.</p></div></section>';

const createDom = (html) => {
  const { document } = new JSDOM(html).window;
  return document;
};

const traverseNodes = (node, depth = 0) => {
  let indent = "";
  for (let i = 0; i < depth; i++) {
    indent += "  ";
  }

  console.log(indent + node.nodeName);

  if (node.childNodes && node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      traverseNodes(node.childNodes[i], depth + 1);
    }
  }
};

const main = async () => {
  const document = createDom(st);

  const startingNode = document.documentElement;

  traverseNodes(startingNode);
};

main();
