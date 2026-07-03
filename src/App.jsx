import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import TabBar from './components/TabBar'
import VoiceFab from './components/VoiceFab'
import HomePage from './pages/HomePage'
import FindCoursePage from './pages/FindCoursePage'
import SavedPage from './pages/SavedPage'
import VoiceAskPage from './pages/VoiceAskPage'
import AISummaryPage from './pages/AISummaryPage'
import CourseDetailPage from './pages/CourseDetailPage'

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

  return (
    <div className="h-dvh bg-[#D6D3CC] flex justify-center overflow-hidden">
      {/* 三段式 flex-col：scroll 區 + TabBar 釘底 */}
      <div className="relative w-full max-w-[390px] h-dvh flex flex-col bg-page shadow-2xl">
        <TabBar />

        <div className="flex-1 overflow-y-auto min-h-0">
          <Routes>
            <Route path="/"      element={<HomePage />} />
            <Route path="/find"  element={<FindCoursePage savedIds={savedIds} onToggleSave={toggleSave} />} />
            <Route path="/saved" element={<SavedPage savedIds={savedIds} onToggleSave={toggleSave} enrolledIds={enrolledIds} />} />
            <Route path="/voice" element={<VoiceAskPage />} />
            <Route path="/course/:courseId" element={<CourseDetailPage savedIds={savedIds} onToggleSave={toggleSave} />} />
            <Route path="/ai-summary/:courseId" element={<AISummaryPage />} />
          </Routes>
        </div>

        {/* absolute：不佔 flex 空間，浮在右下角 */}
        <VoiceFab />
      </div>
    </div>
  )
}
