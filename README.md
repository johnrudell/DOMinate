# DOMinate
<h3><a href="http://johnrudell.com/DOMinate/">DEMO</a></h3>

DOMinate is a JavaScript library mimicing the DOM manipulation of jQuery. It is written in vanilla JavaScript. The demo showcases a simple todo app that can create and remove todos as well as change the background.

<img src="https://res.cloudinary.com/rudell84/image/upload/v1516817925/DOMinate_kad9dw.png"></img>
## DOMinate Features

  + DOM Manipulation
  + Event Handling
  + AJAX requests


## Getting Started

To get started download `lib/main.js` and `lib/dom_node_collection.js` and compile them using webpack: `webpack --watch lib/main.js lib/app_name.js`.

## API

### Core Function
DOMinate utilizes the global variable, `$d`, that provides a wrapper for all functions in the library. It is passed a single argument, an HTML element, CSS selector, or a function. For example, if passed a CSS selector, DOMinate will return an array of all HTML elements that match the selector.


```
const list-items = $d('li');
```

### DOM Manipulation and Traversal

#### `html`

Gets the innerHTML of the DOM element(s).

```
$d(element).html()
```

Sets the innerHTML of the DOM element(s).

```
$d(element).html('hey')
```

#### `empty`
Clears the innerHTML of the DOM element(s).

```
$d(element).empty()
```

#### `append`
Adds child elements to the DOM element(s).

```
$d(element).append(children)
```

#### `attr`
Gets the atrribute of the DOM element.

```
$d(element).attr(attrName)
```
Sets the atrribute of the DOM element.

```
$d(element).attr(attrName, value)
```

#### `addClass`
Adds a class to each DOM element.

```
$d(element).addClass(className)
```

#### `removeClass`
Removes a class from each DOM element.

```
$d(element).removeClass(className)
```

#### `children`
Gets the children of the DOM element(s).

```
$d(element).children()
```

#### `parent`
Gets the parent of the DOM element(s).

```
$d(element).parent()
```

#### `find`
Finds the DOM element(s) by the selector.

```
$d(element).find(selector)
```

#### `remove`
Removes the DOM element(s).

```
$d(element).remove()
```

### Event Listeners

#### `on`
Adds an event listener to the DOM element(s).

```
$d(element).on(eventName, callback)
```

#### `off`
Removes an event listener from the DOM element(s).

```
$d(element).off(eventName, callback)
```

### AJAX
Sends and receieves data from the server, using the XMLHttpRequest API.

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
