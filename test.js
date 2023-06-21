const { JSDOM } = require("jsdom");

const elArr = [];

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

    const tree = createTree(htmlBody);
    // console.log(tree);
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page: ${n}`);
  }
};

function nodeObject(t, p, c, s) {
  this.tagName = t;
  this.parent = p;
  this.children = c;
  this.siblings = s;

  this.id = `${this.tagName}.${this.parent ? this.parent : 0}.${
    Math.floor(Math.random() * 10000) + 1
  }`;
}

function createTree(htmlBody) {
  const dom = new JSDOM(htmlBody);
  const domNode = dom.serialize();
  const { Node } = dom.window;

  function domArrayNormalizer(a) {
    return Array.from(a).filter((node) => node.nodeType === Node.ELEMENT_NODE);
  }

  const arr = domArrayNormalizer(domNode.childNodes);

  console.log("--------Check Level 2");

  arr.forEach((el) => {
    // console.log(el, "||", el.children);
    // console.log(el.children);

    let t = new nodeObject(
      el.tagName,
      el.parentElement.tagName,
      el.childNodes.forEach((e) => console.log(e)),
      el.siblings
    );

    elArr.push(t);

    // if (el.tagName === "BODY") {
    //   Array.from(el.children).forEach((c) => {
    //     console.log(c.tagName);
    //   });
    // }
  });

  console.log("---------------------");
  console.log(elArr);

  //   const childElements = Array.from(domNode.childNodes).filter(
  //     (node) => node.nodeType === Node.ELEMENT_NODE
  //   );
  //   for (let child of domNode.children) {
  //     element.children.push(createTree(child));
  //   }

  //   return element;
}

main();
