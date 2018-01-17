const DOMNodeCollection = require('./dom_node_collection.js');

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
