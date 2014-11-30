
var fs = require("fs")

exports.yasl = function (root, main, output, K) {

  // Callbacks on loading
  var pendings = {}
  
  // Mirror of project hierarchy
  var yasl = {}

  output.write("// Generated with Yasl\n")
  output.write("// See: https://github.com/lachrist/yasl\n")
  output.write("window.yasl = {}\n\n\n\n\n")
  explore(main, [], K)

  function explore (locator, parents, k) {
    // Cycle detection
    if (parents.indexOf(locator) !== -1) { return k(new Error("Cycle detected at "+parents.join(">>"))) }
    // File is being loaded
    if (Array.isArray(pendings[locator])) { return pendings[locator].push(k) }
    // File already loaded
    if (pendings[locator] === null) { return k() }
    // Load file
    parents.push(locator)
    pendings[locator] = []
    var path = locator.replace(/\./g, "/").replace("yasl", root)+".js"
    fs.readFile(path, {encoding:"utf8"}, function (err, content) {
      if (err) { return k(new Error(err.code+" for path "+path+" at "+parents.join(">>"))) }
      var childs = content.match(/yasl(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+/g)
      if (!childs) { childs = [] }
      var rdv = childs.length+1
      function done (err) {
        if (err) { (k(err), done=function () {}) }
        rdv = rdv-1
        if (rdv === 0) {
          // Print locator
          var current = yasl
          var names = locator.split(".")
          for (var i=1; i<names.length-1; i++) {
            if (!current[names[i]]) {
              current[names[i]] = {}
              output.write(names.slice(0,i+1).join(".")+" = {}\n")
            }
            current = current[names[i]]
          }
          // Print content
          var counter = 0
          output.write(locator+" = (function () {\n")
          content.split("\n").forEach(function (line) {
            if ((++counter)%5 === 0) {
              output.write(line+" // "+locator+"@"+counter+"\n")
            } else {
              output.write(line+"\n")
            }
          })
          output.write("}())\n\n\n\n\n")
          // Call pendings
          pendings[locator].forEach(function (k) { k() })
          pendings[locator] = null
          k()
        }
      }
      done()
      childs.forEach(function (child) { explore(child, parents.slice(), done) })
    })
  }

}