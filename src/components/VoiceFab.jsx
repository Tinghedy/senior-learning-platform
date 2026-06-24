import { MicrophoneIcon } from '@heroicons/react/24/outline'
import { useNavigate, useLocation } from 'react-router-dom'

export default function VoiceFab() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  if (pathname === '/voice') return null

  return (
    <button
      type="button"
      onClick={() => navigate('/voice')}
      aria-label="語音問問題"
      className="fixed bottom-[72px] right-md z-30 flex items-center gap-sm min-h-touch px-lg rounded-pill bg-accent text-text-on-accent text-body font-medium shadow-[0_4px_16px_#0000001f] hover:bg-accent-hover transition-colors"
    >
      <MicrophoneIcon className="w-[20px] h-[20px] shrink-0" aria-hidden="true" />
      語音問問題
    </button>
  )
}
