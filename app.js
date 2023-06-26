const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const st =
  '<section class="section-tasks" id="tasks"><div class="task"><div class="task__icon"><span></span></div><p class="task__text"><strong>Full-Stack Development: </strong>I am capable of building full-stack websites and applications, readyto use with a functional front and back-end. I can deploy andmaintain these web applications.</p></div></section>';

const fetchHtml = async (url) => {
  try {
    console.log(`Requesting ${url} . . . `);
    const resp = await fetch(url);

    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} at page ${normalizedURL}`
      );
      return;
    }

    const contentType = resp.headers.get("content-type");

    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType} at page ${normalizedURL}`
      );
      return;
    }

    const html = await resp.text();

    return html;
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
  }
};

const createDom = (html) => {
  const { document } = new JSDOM(html).window;
  return document;
};

const elementNodes = [];
const traverseNodes = (node) => {
  if (node.nodeType === 1) {
    let obj = {
      tag: node.tagName,
      childNodes: Array.from(node.childNodes).filter((el) => el.nodeType === 1),
      parent: node.tagName,
    };

    elementNodes.push(obj);

    for (let i = 0; i < node.childNodes.length; i++) {
      traverseNodes(Array.from(node.childNodes)[i]);
    }
  }
};

const main = async () => {
  // const elementNodes = [];
  // if (process.argv.length < 3) {
  //   console.log("no website page");
  //   process.exit(1);
  // }
  // if (process.argv.length > 3) {
  //   console.log("too many command line args");
  //   process.exit(1);
  // }

  // const baseURL = process.argv[2];

  // const html = await fetchHtml(baseURL);

  // const html = await fetchHtml("https://alltodev.com/");
  // const document = createDom(html);

  const document = createDom(st);

  const startingNode = document.documentElement;

  traverseNodes(startingNode);
};
main();

setTimeout(() => {
  console.log(elementNodes);
}, 300);

// function normalizeURL(urlString) {
//   const urlObj = new URL(urlString);
//   const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

//   if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
//     return hostPath.slice(0, -1);
//   }

//   return hostPath;
// }
