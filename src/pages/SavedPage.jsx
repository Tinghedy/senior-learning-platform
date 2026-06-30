import { useNavigate } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/outline'
import TopBar from '../components/TopBar'
import CourseCard from '../components/CourseCard'
import { courses } from '../data/courses'

export default function SavedPage({ savedIds, onToggleSave, enrolledIds }) {
  const navigate = useNavigate()
  const savedCourses   = courses.filter(c => savedIds.has(c.id))
  const enrolledCourses = courses.filter(c => enrolledIds.has(c.id))

  return (
    <main>
      <TopBar title="有興趣的課" showBack />

      <div className="px-md pt-md pb-[calc(var(--touch-target)+80px)] flex flex-col gap-xl">

        {/* 已報名 */}
        <section aria-label="已報名的課">
          <h2 className="text-h2 font-bold text-text-primary mb-md">已報名</h2>
          {enrolledCourses.length === 0 ? (
            <p className="text-body text-text-muted">還沒有報名的課程。</p>
          ) : (
            <ul className="flex flex-col gap-md" role="list">
              {enrolledCourses.map(c => (
                <li key={c.id} className="bg-card border-[1.5px] border-success rounded-md p-md flex flex-col gap-sm">
                  <div className="flex items-start justify-between gap-md">
                    <div>
                      <p className="text-caption text-success font-bold mb-xs">✓ 報名成功</p>
                      <h3 className="text-body-lg font-bold text-text-primary">{c.title}</h3>
                    </div>
                  </div>
                  {c.mode === 'offline' && (
                    <dl className="text-body text-text-secondary grid grid-cols-[auto_1fr] gap-x-md gap-y-xs">
                      <dt className="font-medium text-text-muted">地點</dt>
                      <dd>{c.location}</dd>
                      <dt className="font-medium text-text-muted">日期</dt>
                      <dd>{c.date}</dd>
                    </dl>
                  )}
                  <p className="text-caption text-text-muted">報名時間：{new Date().toLocaleDateString('zh-TW')}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 收藏的課 */}
        <section aria-label="收藏的課">
          <h2 className="text-h2 font-bold text-text-primary mb-md">收藏的課</h2>
          {savedCourses.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-md py-xl">
              <StarIcon className="w-[48px] h-[48px] text-border" aria-hidden="true" />
              <p className="text-body-lg font-bold text-text-secondary">還沒有收藏的課</p>
              <p className="text-body text-text-muted">去「找課程」看看，找到喜歡的就按「加入有興趣」</p>
              <button
                type="button"
                onClick={() => navigate('/find')}
                className="min-h-touch px-lg rounded-pill bg-accent text-text-on-accent text-body font-medium hover:bg-accent-hover transition-colors"
              >
                去找課程
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-md" role="list">
              {savedCourses.map(c => (
                <li key={c.id}>
                  <CourseCard
                    course={c}
                    savedIds={savedIds}
                    onToggleSave={onToggleSave}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}
