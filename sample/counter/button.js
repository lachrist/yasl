
// Module import, each module is initialized once,
// Counter1 and Counter2 references the same object
var Counter1 = yasl.my_dir.counter
var Counter2 = yasl.my_dir.counter


var div = document.createElement("div")

var button = document.createElement("button")
button.innerHTML = "Incremment"
button.onclick = function () {
  Counter1.increment()
  div.innerHTML = Counter2.get()
}

document.body.appendChild(div)

document.body.appendChild(button)
