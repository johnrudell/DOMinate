class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(arg) {
    if (typeof arg === "string") {
      this.nodes.forEach((node) => {
        node.innerHTML = arg;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    if (this.nodes.length === 0) return;

    if (typeof arg === "string") {
      this.nodes.forEach( (node) => {
        node.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection) {
      this.nodes.forEach( (node) => {
        arg.nodes.forEach( (argNode) => {
          node.appendChild(argNode.cloneNode(true));
        });
      });
    }

  }

  attr(key, value) {
    if (typeof value === "string") {
      this.nodes.forEach(node => node.setAttribute(key, value));
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.nodes.forEach(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.nodes.forEach(node => node.classList.remove(oldClass));
  }

  children() {
    let childNodes = [];
    this.nodes.forEach(node => {
      const childNodeList = Array.from(node.children);
      childNodes = childNodes.concat(childNodeList);
    });
    return new DOMNodeCollection(childNodes);
  }

  parent() {
    let parentNodes = [];
    this.nodes.forEach(node => {
      const parentNodeList = node.parentNode;
      if (!parentNodes.includes(parentNodeList)) {
        parentNodes = parentNodes.concat(parentNodeList);
      }
    });
    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let queriedNodes = [];
    this.nodes.forEach(node => {
      const nodeList = Array.from(node.querySelectorAll(selector));
      queriedNodes = queriedNodes.concat(nodeList);
    });
    return new DOMNodeCollection(queriedNodes);
  }

  remove() {
    this.nodes.forEach(node => node.parentNode.removeChild(node));
  }

  on(e, cb) {
    this.nodes.forEach(node => {
      node.addEventListener(e, cb);
      const eKey = `domination-${e}`;
      if (typeof node[eKey] === "undefined") {
        node[eKey] = [];
      }
      node[eKey].push(cb);
    });
  }

  off(e) {
    this.nodes.forEach(node => {
      const eKey = `domination-${e}`;
      if (node[eKey]) {
        node[eKey].forEach(cb => {
          node.removeEventListener(e, cb);
        });
      }
      node[eKey] = [];
    });
  }

}

module.exports = DOMNodeCollection;
