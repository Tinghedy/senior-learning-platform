import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  PlayCircleIcon,
  ClockIcon,
  MapPinIcon,
  CalendarDaysIcon,
  StarIcon,
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import TopBar from '../components/TopBar'
import Tag from '../components/Tag'
import { courses } from '../data/courses'

export default function CourseDetailPage({ savedIds, onToggleSave }) {
  const { courseId } = useParams()
  const course = courses.find(c => c.id === Number(courseId))
  const [showFeedback, setShowFeedback] = useState(false)

  if (!course) {
    return (
      <main className="flex items-center justify-center h-full">
        <p className="text-body text-text-muted">找不到此課程</p>
      </main>
    )
  }

  const isSaved = savedIds?.has(course.id)

  function handleSave() {
    onToggleSave?.(course.id)
    if (!isSaved) {
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 2500)
    }
  }

  const showPlayButton = course.type === 'video' && course.mode === 'online'

  return (
    <main className="flex flex-col min-h-full">
      <TopBar title={course.title} showBack />

      {/* Hero 縮圖 */}
      <div className="relative h-[200px] bg-sunken shrink-0 overflow-hidden">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-sunken" />
        )}
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-[72px] h-[72px] rounded-full bg-black/50 flex items-center justify-center">
              <PlayCircleIcon className="w-[48px] h-[48px] text-white" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>

      {/* 課程內容 */}
      <div className="flex-1 px-md pt-md pb-xl flex flex-col gap-md">
        {/* 標籤 */}
        <div className="flex flex-wrap gap-xs">
          <Tag type={course.type} />
          <Tag type={course.mode} />
          <Tag type={course.category} />
        </div>

        {/* 標題 */}
        <h1 className="text-h2 font-bold text-text-primary leading-snug">{course.title}</h1>

        {/* 描述 */}
        {course.desc && (
          <p className="text-body text-text-secondary leading-relaxed">{course.desc}</p>
        )}

        {/* Meta */}
        {course.mode === 'online' && course.duration && (
          <div className="flex items-center gap-xs text-caption text-text-muted">
            <ClockIcon className="w-[16px] h-[16px] shrink-0" aria-hidden="true" />
            <span>{course.duration} 分鐘</span>
          </div>
        )}
        {course.mode === 'offline' && (
          <div className="flex flex-col gap-xs">
            {course.location && (
              <div className="flex items-center gap-xs text-body text-text-secondary">
                <MapPinIcon className="w-[18px] h-[18px] shrink-0 text-warning" aria-hidden="true" />
                <span>{course.location}</span>
              </div>
            )}
            {course.date && (
              <div className="flex items-center gap-xs text-body text-text-secondary">
                <CalendarDaysIcon className="w-[18px] h-[18px] shrink-0 text-warning" aria-hidden="true" />
                <span>{course.date}</span>
              </div>
            )}
          </div>
        )}

        {/* AI 重點摘要 */}
        {course.summary?.length > 0 && (
          <section aria-label="AI 重點摘要">
            <h2 className="flex items-center gap-xs text-body-lg font-bold text-text-primary mb-sm">
              <SparklesIcon className="w-[20px] h-[20px] text-accent" aria-hidden="true" />
              AI 重點摘要
            </h2>
            <ol className="flex flex-col gap-sm" role="list">
              {course.summary.map((point, i) => (
                <li key={i} className="flex gap-sm bg-accent-subtle rounded-md px-md py-sm">
                  <span className="text-accent font-bold shrink-0 text-body">{i + 1}</span>
                  <span className="text-body text-text-primary">{point}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>

      {/* 底部操作列 */}
      <div
        className="shrink-0 sticky bottom-0 bg-page border-t border-border px-md py-md flex gap-md"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        {/* 收藏按鈕 */}
        <button
          type="button"
          onClick={handleSave}
          aria-pressed={isSaved}
          aria-label={isSaved ? '取消收藏' : '加入有興趣'}
          className="flex items-center gap-xs min-h-touch px-md rounded-pill border-[1.5px] border-border text-body font-medium text-text-secondary hover:border-accent hover:text-accent transition-colors shrink-0"
        >
          {isSaved
            ? <StarSolidIcon className="w-[20px] h-[20px] text-accent" aria-hidden="true" />
            : <StarIcon className="w-[20px] h-[20px]" aria-hidden="true" />
          }
          {isSaved ? '已收藏' : '加入有興趣'}
        </button>

        {/* 主要 CTA */}
        {course.url ? (
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-xs min-h-touch rounded-pill bg-accent text-text-on-accent text-body font-medium hover:bg-accent-hover transition-colors"
          >
            <ArrowTopRightOnSquareIcon className="w-[18px] h-[18px]" aria-hidden="true" />
            前往學習
          </a>
        ) : course.mode === 'offline' ? (
          <button
            type="button"
            className="flex-1 flex items-center justify-center min-h-touch rounded-pill bg-accent text-text-on-accent text-body font-medium hover:bg-accent-hover transition-colors"
          >
            我要報名
          </button>
        ) : (
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-xs min-h-touch rounded-pill bg-accent text-text-on-accent text-body font-medium hover:bg-accent-hover transition-colors"
          >
            <PlayCircleIcon className="w-[20px] h-[20px]" aria-hidden="true" />
            開始學習
          </button>
        )}

        {/* 收藏成功回饋 */}
        {showFeedback && (
          <p role="status" aria-live="polite" className="sr-only">已加入有興趣的課</p>
        )}
      </div>
    </main>
  )
}
