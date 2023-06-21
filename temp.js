const { JSDOM } = require("jsdom");
const fs = require("fs");

const main = async () => {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many command  line args");
    process.exit(1);
  }

  const baseURL = process.argv[2];

  console.log(`Starting Crawl of ${baseURL}`);

  const pages = await fetcher(baseURL);
  //   printReport(pages);
};

const tarr = [];

const fetcher = async (b) => {
  const n = new URL(b);

  try {
    const resp = await fetch(n);

    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page ${n}`
      );
      return;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType} on page ${n}`
      );
      return;
    }

    const htmlBody = await resp.text();

    // Create a DOM object using jsdom
    const dom = new JSDOM(htmlBody);
    const dEl = dom.window.document.documentElement;
    const { Node } = dom.window;

    // Starting point: the <html> element
    const treeGraph = constructTreeGraph(Node, dEl);

    console.log(treeGraph);
    console.log(tarr);
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page: ${n}`);
  }
};

// Recursive function to construct the tree graph
function constructTreeGraph(n, node) {
  const element = {
    tag: node.tagName.toLowerCase(),
    children: [],
    // content: node.textContent.trim(),
  };

  for (let childNode of node.childNodes) {
    if (childNode.nodeType === n.ELEMENT_NODE) {
      tarr.push(childNode.tagName);
      element.children.push(constructTreeGraph(n, childNode));
    }
  }

  return element;
}

main();
