<h1>DOMinate</h1>
<h3><a href="http://johnrudell.com/DOMinate/">DEMO</a></h3>

<p>DOMinate is a JavaScript library mimicing the DOM manipulation of jQuery. It is written in vanilla JavaScript. The demo showcases a simple todo app that can create and remove todos as well as change the background.</p>

<img src="http://res.cloudinary.com/rudell84/image/upload/v1516171152/DOMinate_kad9dw.png"></img>
<h2>DOMinate Features</h2>
<ul>
  <li>DOM Manipulation</li>
  <li>Event Handling</li>
  <li>AJAX requests</li>
</ul>

<h2>Getting Started</h2>

To get started download `lib/main.js` and `lib/dom_node_collection.js` and compile them using webpack: `webpack --watch lib/main.js lib/app_name.js`.

<h2>API</h2>

<h3>Core Function</h3>
DOMinate utilizes the global variable, `$d`, that provides a wrapper for all functions in the library. It is passed a single argument, an HTML element, CSS selector, or a function. For example, if passed a CSS selector, DOMinate will return an array of all HTML elements that match the selector.
```
const list-items = $d('li');
```

<h3>DOM Manipulation and Traversal</h3>

<h4>`html`</h4>
<p>Retrieves the innerHTML of a DOM element.</p>
```$d(element).html()```
<p>Sets the innerHTML of the DOM element(s).</p>
```$d(element).html('hey')```

<h4>`empty`</h4>
<p>Clears the innerHTML of the DOM element(s).</p>
```$d(element).empty()```

<h4>`append`</h4>
<p>Adds child elements to the DOM element(s).</p>
```$d(element).append(children)```

<h4>`attr`</h4>
<p>Gets the atrribute of the DOM element.</p>
```$d(element).attr(attrName)```
<p>Sets the atrribute of the DOM element.</p>
```$d(element).attr(attrName, value)```

<h4>`addClass`</h4>
<p>Adds a class to each DOM element.</p>
```$d(element).addClass(className)```

<h4>`removeClass`</h4>
<p>Removes a class from each DOM element.</p>
```$d(element).removeClass(className)```

<h4>`children`</h4>
<p>Gets the children of the DOM element(s).</p>
```$d(element).children()```

<h4>`parent`</h4>
<p>Gets the parent of the DOM element(s).</p>
```$d(element).parent()```

<h4>`find`</h4>
<p>Finds the DOM element(s) by the selector.</p>
```$d(element).find(selector)```

<h4>`remove`</h4>
<p>Removes the DOM element(s).</p>
```$d(element).remove()```

<h3>Event Listeners</h3>

<h4>`on`</h4>
<p>Adds an event listener to the DOM element(s).</p>
```$d(element).on(eventName, callback)```

<h4>`off`</h4>
<p>Removes an event listener from the DOM element(s).</p>
```$d(element).off(eventName, callback)```

<h3>AJAX</h3>
<p>Sends and receieves data from the server, using the XMLHttpRequest API.</p>
```
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
 ```


