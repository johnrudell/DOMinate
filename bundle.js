/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const readyCallbacks = [];
let readyState = false;

window.$d = selector => {

  switch (typeof selector) {
    case "function":
      return runDocReadyCallback(selector);
    case "string":
      return fetchDOMNodes(selector);
    case "object":
      if (selector instanceof HTMLElement) {
        return new DOMNodeCollection([selector]);
      }
  }

};

$d.extend = (firstObj, ...objs) => {
  objs.forEach(obj => {
    for (const prop in obj) {
      firstObj[prop] = obj[prop];
    }
  });
  return firstObj;
};

$d.ajax = objs => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  objs = $d.extend(defaults, objs);
  objs.method = objs.method.toUpperCase();


  if (objs.method === "GET") {
    objs.url += `${toQueryString(objs.data)}`;
  }

  request.open(objs.method, objs.url, true);
  request.onload = e => {
    if (request.status === 200) {
      objs.success(request.response);
    } else {
      objs.error(request.response);
    }
  };

  request.send(JSON.stringify(objs.data));
};


// Private methods

toQueryString = obj => {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};

runDocReadyCallback = func => {
  if (!readyState) {
    readyCallbacks.push(func);
  } else {
    func();
  }
};

fetchDOMNodes = selector => {
  nodes = document.querySelectorAll(selector);
  nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
}

document.addEventListener("DOMContentLoaded", () => {
  readyState = true;
  readyCallbacks.forEach(func => func());
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map