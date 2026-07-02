export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { question } = req.body
  if (!question) {
    return res.status(400).json({ error: 'Missing question' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  const systemPrompt = `你是「樂齡學習平台」的 AI 助理，專門幫助 60 歲以上的長者學習使用智慧型手機與數位工具。

回答規則：
- 用繁體中文回答
- 語氣親切、耐心，像對長輩說話
- 步驟要簡單清楚，一次最多 3～4 個步驟
- 避免用專業術語，若要用請加白話說明
- 回答控制在 150 字以內`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: question }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
        }),
      }
    )

    if (!response.ok) {
      const err = await response.text()
      return res.status(502).json({ error: 'Gemini error', detail: err })
    }

    const data = await response.json()
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '抱歉，我暫時無法回答，請稍後再試。'
    return res.status(200).json({ answer })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
