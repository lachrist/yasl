#!/usr/bin/env node

if (!process.argv[2] || !process.argv[3]) {
  process.stderr.write("Usage \"yasl path/to/root yasl.path.to.main\n\"")
} else {
  require("./yasl.js").yasl(process.argv[2], process.argv[3], process.stdout, function (err) {
    if (err) {
      process.stderr.write(String(err)+"\n")
    }
  })
}
