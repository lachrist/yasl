Yet Another Static Loader
=========================

Yasl is a small node script for loading JavaScript files at compile time.
Usage: 
```bash
node yasl.js /path/to/root yasl.relative.path.to.entry > /path/to/main.js
```
File can easily refers to each other with the syntax:
```javascript
var module_name = yasl.relative.path.to.file
```
Yasl recusively looks for such expression within your code and bundle those files within one big ``main'' file.
To implement encapsulation, Yasl wrap file's contents within anonymous function.
Therefore a Yasl module looks like this:
```javascript
// protected scope
// yasl imports
// initialization
// x is visible with import
return x
```
