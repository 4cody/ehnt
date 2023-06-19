const { JSDOM } = require("jsdom");

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

function createTree(htmlBody) {
  const dom = new JSDOM(htmlBody);

  const domNode = dom.window.document.documentElement;
  //   const element = {
  //     tag: domNode.tagName,
  //     children: [],
  //   };

  const arr = Array.from(domNode.childNodes);
  //   console.log(domNode.outerHTML);
  console.log("--------Check Level 2");

  arr.forEach((el) => {
    if (el.tagName === "BODY") {
      Array.from(el.children).forEach((c) => {
        console.log(c.tagName);
      });
    }
  });

  console.log("---------------------");

  //   const childElements = Array.from(domNode.childNodes).filter(
  //     (node) => node.nodeType === Node.ELEMENT_NODE
  //   );
  //   for (let child of domNode.children) {
  //     element.children.push(createTree(child));
  //   }

  //   return element;
}

main();
