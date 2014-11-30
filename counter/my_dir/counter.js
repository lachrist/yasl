var counter = 0

console.log("Counter initialized")

return {
  increment: function () { counter = counter+1 },
  get: function () { return counter }
}

console.log("This is never executed")
