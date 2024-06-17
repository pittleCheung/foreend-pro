# auth2 流程

```js
// 第一步 自己服务器给github服务器发请求
/* 拦截前端的a链接跳转 */
router.get("/loginByGithub", async (ctx) => {
  /* 跳转到git获取授权码的地址  携带了client_id参数*/
  const path =
    "https://github.com/login/oauth/authorize?client_id=bde00f5fb6011f0e309e"
  ctx.redirect(path)
})

// 第一步请求会响应一个github授权的页面 相当于登录的页面
// 第二步 github服务器接收第一步的请求 然后给自己服务器发请求
// 点击授权按钮 验证当前请求用户的身份 生成一个唯一的code
router.get("/authorize", async (ctx) => {
  const client_id = ctx.query.client_id
  const name = ctx.name;
  const password = ctx.password;//通过授权页面可以获取用户的账号和密码
  const code = await post("/github/login",{
    name,
    password,
  }) //code可以验证
  // let code = "Github上配置的随机的code"
  const path = ctx.redirect(
    "https://github账号下配置的Authorization callback URL" + "?code=" + code,
  )
  ctx.success("授权成功")
})

// 第三步 自己服务器接受第二步的请求 给github发请求
router.get("/github/callback", async (ctx) => {
  // 从第二步获取的code
  const { code } = ctx.query
  client_id = ""
  client_secret = ""
  const token = request({
    url:"https://github.com/login/oauth/access_token"
    code,
    client_id,
    client_secret,
  })
})
```

```js
// 第一步 自己服务器给github服务器发请求
/* 拦截前端的a链接跳转 */
router.get("/loginByGithub", async (ctx) => {
  /* 跳转到git获取授权码的地址  携带了client_id参数*/
  const path =
    "https://github.com/login/oauth/authorize?client_id=bde00f5fb6011f0e309e"
  ctx.redirect(path)
})

// 第二步 github服务器接收第一步的请求 然后给自己服务器发请求
// 点击授权按钮 验证当前请求用户的身份 生成一个唯一的code
router.get("/authorize", async (ctx) => {
  let code = "Github上配置的随机的code"
  const path = ctx.redirect(
    "https://github账号下配置的Authorization callback URL" + "?code=" + code,
  )
  const token = request({
    url:"https://github.com/login/oauth/access_token"
    code,
    client_id,
    client_secret,
  })
  ctx.redirect("/token","发送token给服务器")
})

// 自己服务器
router.get("/token",ctx => {
  ctx.success("授权成功")
})
```
