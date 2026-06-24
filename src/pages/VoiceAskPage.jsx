import { useState, useRef, useEffect } from 'react'
import { MicrophoneIcon } from '@heroicons/react/24/outline'
import TopBar from '../components/TopBar'

const QUICK_QUESTIONS = [
  '怎麼用 LINE 視訊？',
  '健保卡怎麼查？',
  '手機如何設定 Wi-Fi？',
]

const MOCK_ANSWERS = {
  '怎麼用 LINE 視訊？': '用 LINE 視訊很簡單，只要三步驟：\n1. 打開 LINE，找到你要視訊的朋友\n2. 進入聊天室後，點右上角的電話圖示\n3. 選「視訊通話」，對方接了就可以看到彼此\n\n如果想學更多，可以看我們的【LINE 視訊通話完整教學】影片，18 分鐘帶你從頭學。',
  '健保卡怎麼查？': '查健保可以用「全民健保行動快易通」App：\n1. 到 App Store 或 Google Play 搜尋「健保快易通」\n2. 下載安裝後，用健保卡綁定帳號\n3. 綁定後就能查就醫紀錄、預約掛號\n\n如果不熟悉 App 操作，我們有「健保卡綁定手機」的圖文教學可以一步一步跟著做。',
}

const IDLE_STATE     = 'idle'
const RECORDING_STATE = 'recording'
const PROCESSING_STATE = 'processing'

export default function VoiceAskPage() {
  const [voiceState, setVoiceState] = useState(IDLE_STATE)
  const [messages, setMessages] = useState([])
  const recognitionRef = useRef(null)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function addMessage(role, text) {
    setMessages(prev => [...prev, { role, text, id: Date.now() }])
  }

  function handleAnswer(question) {
    addMessage('user', question)
    setVoiceState(PROCESSING_STATE)
    setTimeout(() => {
      const answer = MOCK_ANSWERS[question] || `你問的是「${question}」，這是個好問題！\n\n目前我正在學習更多相關內容，建議你到「找課程」頁搜尋相關關鍵字，或到「有興趣的課」查看已收藏的課程。`
      addMessage('ai', answer)
      setVoiceState(IDLE_STATE)
    }, 1200)
  }

  function startRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      addMessage('ai', '您的瀏覽器不支援語音辨識。\n\n請試試下方的常見問題按鈕，或直接輸入問題。')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'zh-TW'
    recognition.interimResults = false
    recognition.onresult = e => {
      const text = e.results[0][0].transcript
      setVoiceState(IDLE_STATE)
      handleAnswer(text)
    }
    recognition.onerror = () => setVoiceState(IDLE_STATE)
    recognition.onend   = () => {
      if (voiceState === RECORDING_STATE) setVoiceState(IDLE_STATE)
    }
    recognitionRef.current = recognition
    recognition.start()
    setVoiceState(RECORDING_STATE)
  }

  function stopRecording() {
    recognitionRef.current?.stop()
    setVoiceState(IDLE_STATE)
  }

  function handleMicClick() {
    if (voiceState === IDLE_STATE) startRecording()
    else stopRecording()
  }

  const micLabel = voiceState === IDLE_STATE ? '點一下開始說話' : voiceState === RECORDING_STATE ? '錄音中，點一下停止' : '處理中……'

  return (
    <main className="flex flex-col h-dvh">
      <TopBar title="語音問問題" showBack />

      {/* 對話區 */}
      <div className="flex-1 overflow-y-auto px-md pt-md pb-sm flex flex-col gap-md">
        {messages.length === 0 && (
          <p className="text-body text-text-muted text-center py-lg">點下方麥克風說出你的問題，\n或從常見問題選一個</p>
        )}
        {messages.map(msg => (
          <div
            key={msg.id}
            className={['flex', msg.role === 'user' ? 'justify-end' : 'justify-start'].join(' ')}
          >
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
      <div className="px-md pb-sm">
        <p className="text-caption text-text-muted mb-sm font-medium">常見問題</p>
        <div className="flex flex-wrap gap-sm">
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              type="button"
              onClick={() => handleAnswer(q)}
              disabled={voiceState === PROCESSING_STATE}
              className="min-h-touch px-md rounded-pill border-[1.5px] border-border bg-card text-body text-text-primary hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 麥克風 + 狀態 */}
      <div className="flex flex-col items-center gap-md px-md pt-md pb-[calc(56px+24px)]">
        <button
          type="button"
          onClick={handleMicClick}
          disabled={voiceState === PROCESSING_STATE}
          aria-label={micLabel}
          className={[
            'w-[96px] h-[96px] rounded-full flex items-center justify-center transition-all shadow-[0_4px_16px_#0000001f] disabled:opacity-50',
            voiceState === RECORDING_STATE
              ? 'bg-error animate-pulse'
              : 'bg-accent hover:bg-accent-hover',
          ].join(' ')}
        >
          <MicrophoneIcon className="w-[40px] h-[40px] text-white" aria-hidden="true" />
        </button>
        <p className="text-body text-text-secondary text-center" aria-live="polite">
          {micLabel}
        </p>
      </div>
    </main>
  )
}
