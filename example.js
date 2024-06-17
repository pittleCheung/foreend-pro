import { ChatGPTAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const res = await api.sendMessage('nvm怎么永久切换node版本')
  console.log(res.text)
}


example()
