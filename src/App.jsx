import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TabBar from './components/TabBar'
import VoiceFab from './components/VoiceFab'
import HomePage from './pages/HomePage'
import FindCoursePage from './pages/FindCoursePage'
import SavedPage from './pages/SavedPage'
import VoiceAskPage from './pages/VoiceAskPage'

export default function App() {
  const [savedIds,    setSavedIds]    = useState(new Set())
  const [enrolledIds, setEnrolledIds] = useState(new Set())

  function toggleSave(id) {
    setSavedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const location = useLocation()
  const isVoicePage = location.pathname === '/voice'

  return (
    /* transform: translateZ(0) 讓 position:fixed 子元素相對此框定位，而非 viewport */
    <div className="h-dvh bg-[#D6D3CC] flex justify-center overflow-hidden">
      <div
        className="relative w-full max-w-[390px] h-dvh overflow-y-auto bg-page shadow-2xl"
        style={{ transform: 'translateZ(0)' }}
      >
        <Routes>
          <Route path="/"      element={<HomePage />} />
          <Route path="/find"  element={<FindCoursePage savedIds={savedIds} onToggleSave={toggleSave} />} />
          <Route path="/saved" element={<SavedPage savedIds={savedIds} onToggleSave={toggleSave} enrolledIds={enrolledIds} />} />
          <Route path="/voice" element={<VoiceAskPage />} />
        </Routes>

        <VoiceFab />
        <TabBar />
      </div>
    </div>
  )
}
