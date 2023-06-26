const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const st =
  '<section class="section-tasks" id="tasks"><div class="task"><div class="task__icon"><span></span></div><p class="task__text"><strong>Full-Stack Development: </strong>I am capable of building full-stack websites and applications, readyto use with a functional front and back-end. I can deploy andmaintain these web applications.</p></div></section>';

const createDom = (html) => {
  const { document } = new JSDOM(html).window;
  return document;
};

const elementNodes = [];
const traverseNodes = (node) => {
  if (node.nodeType === 1 || node.nodeType === 3 || node.nodeType === 8) {
    let obj = {
      nodeType: node.nodeType,
      nodeName: node.nodeName,
      nodeValue: node.nodeValue,
      childNodes: [],
      parent: node.parentNode ? node.parentNode.nodeName : null,
    };

    if (node.nodeType === 1) {
      obj.childNodes = Array.from(node.childNodes).filter(
        (el) => el.nodeType !== 7
      );
    }

    elementNodes.push(obj);

    for (let i = 0; i < node.childNodes.length; i++) {
      traverseNodes(node.childNodes[i]);
    }
  }
};

const main = async () => {
  const document = createDom(st);

  const startingNode = document.documentElement;

  traverseNodes(startingNode);
};

main();

setTimeout(() => {
  console.log(elementNodes);
}, 300);
