import { useState, useRef, useEffect } from 'react'
import { MicrophoneIcon } from '@heroicons/react/24/outline'
import TopBar from '../components/TopBar'

const QUICK_QUESTIONS = [
  '怎麼用 LINE 視訊？',
  '健保卡怎麼查？',
  '手機如何設定 Wi-Fi？',
]

async function askGemini(question) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  })
  if (!res.ok) throw new Error('API 回應錯誤')
  const data = await res.json()
  return data.answer
}

const IDLE       = 'idle'
const RECORDING  = 'recording'
const PROCESSING = 'processing'
const ERROR      = 'error'

export default function VoiceAskPage() {
  const [voiceState, setVoiceState] = useState(IDLE)
  const [errorMsg,   setErrorMsg]   = useState('')
  const [interim,    setInterim]    = useState('')   // 逐字即時文字
  const [messages,   setMessages]   = useState([])
  const recognitionRef = useRef(null)
  const voiceStateRef  = useRef(IDLE)
  const interimRef     = useRef('')   // onend 保底送出用
  const submittedRef   = useRef(false)
  const chatEndRef     = useRef(null)

  function setVS(s) {
    voiceStateRef.current = s
    setVoiceState(s)
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function addMessage(role, text) {
    setMessages(prev => [...prev, { role, text, id: Date.now() }])
  }

  async function handleAnswer(question) {
    addMessage('user', question)
    setVS(PROCESSING)
    setErrorMsg('')
    try {
      const answer = await askGemini(question)
      addMessage('ai', answer)
    } catch {
      addMessage('ai', '抱歉，網路有點問題，請稍後再試一次。')
    } finally {
      setVS(IDLE)
    }
  }

  function startRecording() {
    setErrorMsg('')
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setErrorMsg('此裝置不支援語音辨識，請改用下方的常見問題。')
      setVS(ERROR)
      setTimeout(() => setVS(IDLE), 3000)
      return
    }

    submittedRef.current = false
    interimRef.current   = ''

    const rec = new SR()
    rec.lang = 'zh-TW'
    rec.interimResults = true
    rec.continuous = false

    rec.onresult = e => {
      let finalText   = ''
      let interimText = ''
      for (const result of e.results) {
        if (result.isFinal) finalText   += result[0].transcript
        else                interimText += result[0].transcript
      }
      // 追蹤目前累積的文字，供 onend 保底使用
      interimRef.current = interimText || finalText || interimRef.current
      setInterim(interimText)

      if (finalText && !submittedRef.current) {
        submittedRef.current = true
        setInterim('')
        setVS(IDLE)
        handleAnswer(finalText)
      }
    }

    rec.onerror = e => {
      setInterim('')
      const msg =
        e.error === 'not-allowed' ? '請允許麥克風權限後再試一次。' :
        e.error === 'no-speech'   ? '沒有偵測到說話聲音，請再試一次。' :
        e.error === 'network'     ? '網路問題，請確認連線後再試。' :
                                    '語音辨識發生錯誤，請再試一次。'
      setErrorMsg(msg)
      setVS(ERROR)
      setTimeout(() => setVS(IDLE), 3000)
    }

    rec.onend = () => {
      if (submittedRef.current) return   // 已由 onresult 送出，略過
      const text = interimRef.current.trim()
      interimRef.current = ''
      setInterim('')
      if (text) {
        submittedRef.current = true
        setVS(IDLE)
        handleAnswer(text)
      } else if (voiceStateRef.current === RECORDING) {
        setErrorMsg('沒有偵測到說話聲音，請再試一次。')
        setVS(ERROR)
        setTimeout(() => setVS(IDLE), 3000)
      }
    }

    recognitionRef.current = rec
    try {
      rec.start()
      setVS(RECORDING)
    } catch {
      setErrorMsg('無法啟動語音辨識，請重新整理後再試。')
      setVS(ERROR)
      setTimeout(() => setVS(IDLE), 3000)
    }
  }

  function stopRecording() {
    recognitionRef.current?.stop()
    setVS(IDLE)
  }

  function handleMicClick() {
    if (voiceState === IDLE || voiceState === ERROR) startRecording()
    else if (voiceState === RECORDING) stopRecording()
  }

  const micLabel =
    voiceState === RECORDING  ? '錄音中，點一下停止' :
    voiceState === PROCESSING ? '處理中……' :
                                '點一下開始說話'

  const micBg =
    voiceState === RECORDING  ? 'bg-red-500 animate-pulse' :
    voiceState === ERROR       ? 'bg-red-400' :
                                 'bg-accent hover:bg-accent-hover'

  return (
    <main className="flex flex-col h-full">
      <TopBar title="語音問問題" showBack />

      {/* 對話區 */}
      <div className="flex-1 overflow-y-auto px-md pt-md pb-sm flex flex-col gap-md min-h-0">
        {messages.length === 0 && (
          <p className="text-body text-text-muted text-center py-lg">
            點下方麥克風說出你的問題，{'\n'}或從常見問題選一個
          </p>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={['flex', msg.role === 'user' ? 'justify-end' : 'justify-start'].join(' ')}>
            <div
              className={[
                'max-w-[85%] px-md py-sm rounded-lg text-body whitespace-pre-line',
                msg.role === 'user'
                  ? 'bg-accent text-text-on-accent rounded-br-sm'
                  : 'bg-card border-[1.5px] border-border text-text-primary rounded-bl-sm',
              ].join(' ')}
              role={msg.role === 'ai' ? 'status' : undefined}
              aria-live={msg.role === 'ai' ? 'polite' : undefined}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 常見問題 */}
      <div className="px-md pb-sm shrink-0">
        <p className="text-caption text-text-muted mb-sm font-medium">常見問題</p>
        <div className="flex flex-wrap gap-sm">
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              type="button"
              onClick={() => handleAnswer(q)}
              disabled={voiceState === PROCESSING}
              className="min-h-touch px-md rounded-pill border-[1.5px] border-border bg-card text-body text-text-primary hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 即時逐字稿 */}
      {interim && (
        <div className="px-md pb-sm shrink-0">
          <p className="text-body-lg text-text-primary text-center leading-relaxed bg-card border-[1.5px] border-accent rounded-md px-md py-sm animate-pulse">
            {interim}
          </p>
        </div>
      )}

      {/* 麥克風 */}
      <div className="flex flex-col items-center gap-sm px-md pt-md pb-lg shrink-0" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <button
          type="button"
          onClick={handleMicClick}
          disabled={voiceState === PROCESSING}
          aria-label={micLabel}
          className={[
            'w-[96px] h-[96px] rounded-full flex items-center justify-center transition-all shadow-[0_4px_16px_#0000001f] disabled:opacity-50 touch-manipulation',
            micBg,
          ].join(' ')}
        >
          <MicrophoneIcon className="w-[40px] h-[40px] text-white" aria-hidden="true" />
        </button>

        <p className="text-body text-text-secondary text-center" aria-live="polite">
          {micLabel}
        </p>

        {/* 錯誤訊息：直接顯示在按鈕下方，醒目可見 */}
        {errorMsg && (
          <p role="alert" className="text-body text-red-500 text-center font-medium px-md">
            {errorMsg}
          </p>
        )}
      </div>
    </main>
  )
}
