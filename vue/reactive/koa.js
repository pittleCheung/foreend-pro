// const Koa = require("koa")
// const fs = require("fs")
// const path = require("path")

import Koa from "koa"
import fs from "fs"
import path from "path"

// console.log(import.meta.url)

const app = new Koa()

app.use(async (ctx) => {
  const { url, query } = ctx.request
  console.log(url)
  if (url === "/") {
    ctx.type = "text/html"
    ctx.body = fs.readFileSync("./index.html", "utf-8")
  } else if (url.endsWith(".js")) {
    const p = path.join("./", url)
    ctx.type = "application/javascript"
    console.log(p)
    ctx.body = fs.readFileSync(p)
    // ctx.body = rewriteImport(fs.readFileSync(p, 'utf8'));
  }
})

app.listen(8888, () => {
  console.log("kvite startup!!!")
})
