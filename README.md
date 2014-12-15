# Yasl

Yasl is a simple JavaScript compiler for managing dependencies between JavaScript files.
N.B.: This module is very similar to browserify (http://browserify.org/) which is way more mature.
You can install yasl with `npm install yasl -g`. Usage:

```bash
yasl /path/to/root yasl.relative.path.to.main > /path/to/output.js
```

Each file compiled by yasl is embeded within an anonymous function to provide encapsulation.
The return value of each file is accessible by other files using the keyword `yasl`.
Below is a typical configuration of a JavaScript file compilable by yasl:

```JavaScript
var module_name = yasl.relative.path.to.file
var exports = {}
// populate the exports object
return exports; 
```

An example of project compiled with the command `yasl ./counter yasl.button > ./counter/main.js` can be found at https://github.com/lachrist/yasl/tree/master/counter.
