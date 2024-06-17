process.on("message", function (m) {
  console.log("message======", m)
})

process.send({ foo: "bar" })
