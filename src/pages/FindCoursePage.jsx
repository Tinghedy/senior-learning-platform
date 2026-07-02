import { useState, useMemo } from 'react'
import TopBar from '../components/TopBar'
import SearchField from '../components/SearchField'
import CourseCard from '../components/CourseCard'
import { courses } from '../data/courses'

const MODES = [
  { id: 'all',     label: '全部' },
  { id: 'online',  label: '線上' },
  { id: 'offline', label: '線下' },
]

export default function FindCoursePage({ savedIds, onToggleSave }) {
  const [search, setSearch] = useState('')
  const [mode, setMode] = useState('all')

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchMode   = mode === 'all' || c.mode === mode
      const matchSearch = !search || c.title.includes(search) || c.desc.includes(search)
      return matchMode && matchSearch
    })
  }, [search, mode])

  return (
    <main>
      <TopBar
        title="找課程"
        showBack
        rightContent={`共 ${filtered.length} 堂`}
      />

      <div className="px-md pt-md pb-[calc(var(--touch-target)+80px)] flex flex-col gap-md">
        {/* 搜尋欄 */}
        <SearchField
          value={search}
          onChange={e => setSearch(e.target.value)}
          id="find-search"
        />

        {/* 上課方式 toggle */}
        <fieldset>
          <legend className="sr-only">上課方式</legend>
          <div className="flex gap-sm">
            {MODES.map(m => (
              <button
                key={m.id}
                type="button"
                aria-pressed={mode === m.id}
                onClick={() => setMode(m.id)}
                className={[
                  'flex-1 min-h-touch rounded-pill text-body font-medium border-[1.5px] transition-colors',
                  mode === m.id
                    ? 'bg-accent border-accent text-text-on-accent font-bold'
                    : 'bg-card border-border text-text-primary',
                ].join(' ')}
              >
                {m.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* 課程列表 */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2xl text-center gap-md">
            <p className="text-body-lg font-bold text-text-secondary">找不到符合的課程</p>
            <p className="text-body text-text-muted">試試調整搜尋條件，或選「全部」看看所有課程</p>
            <button
              type="button"
              onClick={() => { setSearch(''); setMode('all') }}
              className="min-h-touch px-lg rounded-pill bg-accent text-text-on-accent text-body font-medium hover:bg-accent-hover transition-colors"
            >
              清除篩選
            </button>
          </div>
        ) : (
          <ul className="flex flex-col gap-md" role="list">
            {filtered.map(course => (
              <li key={course.id}>
                <CourseCard
                  course={course}
                  savedIds={savedIds}
                  onToggleSave={onToggleSave}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
