// Usage: node yasl.js /path/to/root/ relative.path.to.main


var fs = require("fs")


// Project's root directory 
var root = process.argv[2]
// Entry point of the project (must be a locator)
var main = process.argv[3]
// Function to be applied on loading
var pendings = {}
// Project's hierarchy
var yasl = {}


process.stdout.write("// Generated with Yasl\n")
process.stdout.write("// See: https://github.com/lachrist/yasl\n")
process.stdout.write("window.yasl = {}\n\n\n\n\n")
explore(main, [], function () {})


function explore (locator, parents, k) {
  // Cycle detection
  if (parents.indexOf(locator) !== -1) { crash("Cycle detected at "+parents.join(">>")+"\n") }
  // File is being loaded
  if (Array.isArray(pendings[locator])) { return pendings[locator].push(k) }
  // File already loaded
  if (pendings[locator] === null) { return k() }
  // Load file
  parents.push(locator)
  pendings[locator] = []
  fs.readFile(locator_to_path(locator), {encoding:"utf8"}, function (error, content) {
    if (error) {
      switch (error.errno) {
        case 34: crash("The file from "+parents.join(">>")+" does not exists")
        case 3:  crash("No read permission on file "+parents.join(">>"))
        default: crash("Unexpected error "+error.errno+" at "+parents.join(">>"))
      }
    } else {
      var childs = content.match(/yasl(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+/g)
      if (!childs) { childs = [] }
      var rdv = childs.length+1
      function done () {
        rdv = rdv-1
        if (rdv === 0) {
          output(locator, content)
          pendings[locator].forEach(function (k) { k() })
          pendings[locator] = null
          k()
        }
      }
      done()
      childs.forEach(function (child) { explore(child, parents.slice(), done) })
    }
  })
}


function output (locator, content) {
  // Update project's hierarchy
  var current = yasl
  var names = locator.split(".")
  for (var i=1; i<names.length-1; i++) {
    if (!current[names[i]]) {
      current[names[i]] = {}
      process.stdout.write(names.slice(0,i+1).join(".")+" = {}\n")
    }
    current = current[names[i]]
  }
  // Output content
  var counter = 0
  process.stdout.write(locator+" = (function () {\n")
  content.split("\n").forEach(function (line) {
    if ((++counter)%5 === 0) {
      process.stdout.write(line+" // "+locator+"@"+counter+"\n")
    } else {
      process.stdout.write(line+"\n")
    }   
  })
  process.stdout.write("}())\n\n\n\n\n")
}


function crash (msg) {
  process.stderr.write(msg)
  process.exit(1)
}


function locator_to_path (locator) {
  return locator.replace(/\./g, "/").replace("yasl", root)+".js"
}
