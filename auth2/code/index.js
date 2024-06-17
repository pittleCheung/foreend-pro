const Koa = require("koa")
const router = require("koa-router")()
const staticFiles = require("koa-static")
const path = require("path")
const views = require("koa-views")
const axios = require("axios")
const qs = require("qs")
const app = new Koa()

let userInfo = {}

app.use(staticFiles(path.resolve(__dirname, "./public")))
app.use(views("views", { map: { html: "ejs" } }))

/* 模板路由处理 */
router.get("/login", async (ctx) => {
  console.log("123")
  await ctx.render("login")
})
router.get("/home", async (ctx) => {
  await ctx.render("home", { userInfo })
})

// 第一步
/* 拦截前端的a链接跳转 */
router.get("/loginByGithub", async (ctx) => {
  /* 跳转到git获取授权码的地址  携带了client_id参数*/
  const path =
    "https://github.com/login/oauth/authorize?client_id=847c42d49764d0963844"
  ctx.redirect(path)
})

// 第二步 github服务器
// router.get("/login/oauth/authorize", async (ctx) => {
//   let code = "Github上配置的随机的code"
//   const path = ctx.redirect(
//     "https://github账号下配置的Authorization callback URL" + "?code" + code,
//   )
// })

// 第三步 跑在自己服务器上面
// router.get("/github/callback", async (ctx) => {
//   // 从第二步获取的code
//   const { code } = ctx.query
//   client_id = ""
//   client_secret = ""
//   const token = request({
//     code,
//     client_id,
//     client_secret,
//   })
// })

/* 创建一个授权码的地址路由 */
router.get("/callback/github", async (ctx) => {
  console.log("start", ctx.query)
  const { code } = ctx.query
  // /* 请求令牌 post  params参数 */
  const accessToken = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: "847c42d49764d0963844",
      client_secret: "b51ff8236b867ab7207ac0b1db5ad094d7046886",
      code,
    },
  )
  console.log(accessToken)
  const { access_token } = qs.parse(accessToken.data)
  /* 获取用户的信息 */
  userInfo = await axios.get("https://api.github.com/user", {
    /* Bearer 后面记得跟一个空格 */
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })
  userInfo = userInfo.data
  ctx.redirect("/home")
})

app.use(router.routes())
app.listen(3000, () => {
  console.log("server is running on port 3000")
})
