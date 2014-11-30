# Yasl

Yasl is a simple JavaScript compiler for managing dependencies between JavaScript files.
You can install yasl with `npm install yasl -g`. Usage:

```bash
yasl /path/to/root yasl.relative.path.to.main > /path/to/output.js
```
s
File can easily refers to each other with the syntax:
```javascript
var module_name = yasl.relative.path.to.file
```

Yasl will explore the given main 

Example 

yasl ./sample/counter yasl.button > ./sample/counter/main.js 




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
