#!/usr/bin/env node

require("./yasl.js").yasl(process.argv[1], process.argv[2], process.stdout, function (err) { if (err) { throw err } })
