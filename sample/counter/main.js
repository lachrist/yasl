// Generated with Yasl
// See: https://github.com/lachrist/yasl
window.yasl = {}




yasl.my_dir = {}
yasl.my_dir.counter = (function () {
var counter = 0

console.log("Counter initialized")

return { // yasl.my_dir.counter@5
  increment: function () { counter = counter+1 },
  get: function () { return counter }
}

console.log("This is never executed") // yasl.my_dir.counter@10

}())




yasl.button = (function () {

// Module import, each module is initialized once,
// Counter1 and Counter2 references the same object
var Counter1 = yasl.my_dir.counter
var Counter2 = yasl.my_dir.counter // yasl.button@5


var div = document.createElement("div")

var button = document.createElement("button") // yasl.button@10
button.innerHTML = "Incremment"
button.onclick = function () {
  Counter1.increment()
  div.innerHTML = Counter2.get()
} // yasl.button@15

document.body.appendChild(div)

document.body.appendChild(button)
 // yasl.button@20
}())




