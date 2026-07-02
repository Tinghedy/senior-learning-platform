import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StarIcon, ClockIcon, MapPinIcon, CalendarDaysIcon, SparklesIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import Tag from './Tag'

export default function CourseCard({ course, savedIds, onToggleSave }) {
  const [showFeedback, setShowFeedback] = useState(false)
  const navigate = useNavigate()
  const isSaved = savedIds.has(course.id)

  function handleSave() {
    onToggleSave(course.id)
    if (!isSaved) {
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 2500)
    }
  }

  return (
    <article className="bg-card border-[1.5px] border-border rounded-md shadow-[0_1px_3px_#00000014] overflow-hidden">
      {/* 縮圖 */}
      <div className="relative h-[120px] bg-sunken overflow-hidden">
        {course.thumbnail
          ? <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center"><span className="text-text-muted text-caption">課程縮圖</span></div>
        }
        <button
          type="button"
          onClick={() => navigate(`/ai-summary/${course.id}`)}
          aria-label="AI 講重點"
          className="absolute top-sm right-sm flex items-center gap-xs px-sm py-xs rounded-pill bg-accent text-text-on-accent text-caption font-bold shadow-md"
        >
          <SparklesIcon className="w-[14px] h-[14px]" aria-hidden="true" />
          AI 講重點
        </button>
      </div>

      {/* 內容 */}
      <div className="p-md flex flex-col gap-sm">
        {/* 標籤列 */}
        <div className="flex flex-wrap gap-xs">
          <Tag type={course.type} />
          <Tag type={course.mode} />
          <Tag type={course.category} />
        </div>

        {/* 標題 */}
        <h2 className="text-body-lg font-bold text-text-primary leading-tight">{course.title}</h2>

        {/* 描述 */}
        <p className="text-body text-text-secondary">{course.desc}</p>

        {/* Meta */}
        {course.mode === 'online' ? (
          <div className="flex items-center gap-md text-caption text-text-muted">
            <span className="flex items-center gap-xs">
              <ClockIcon className="w-[16px] h-[16px]" aria-hidden="true" />
              {course.duration} 分鐘
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-md text-caption text-text-muted">
            <span className="flex items-center gap-xs">
              <MapPinIcon className="w-[16px] h-[16px]" aria-hidden="true" />
              {course.location}
            </span>
            <span className="flex items-center gap-xs">
              <CalendarDaysIcon className="w-[16px] h-[16px]" aria-hidden="true" />
              {course.date}
            </span>
          </div>
        )}

        {/* 收藏鈕 + 外部連結 + 成功回饋 */}
        <div className="flex items-center gap-md pt-xs border-t border-border">
          <button
            type="button"
            onClick={handleSave}
            aria-pressed={isSaved}
            aria-label={isSaved ? '取消收藏' : '加入有興趣'}
            className="flex items-center gap-xs min-h-touch px-md rounded-pill border-[1.5px] border-border text-body font-medium text-text-secondary hover:border-accent hover:text-accent transition-colors"
          >
            {isSaved
              ? <StarSolidIcon className="w-[20px] h-[20px] text-accent" aria-hidden="true" />
              : <StarIcon className="w-[20px] h-[20px]" aria-hidden="true" />
            }
            {isSaved ? '已收藏' : '加入有興趣'}
          </button>

          {course.url && (
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="前往學習（開啟新分頁）"
              className="flex items-center gap-xs min-h-touch px-md rounded-pill bg-accent text-text-on-accent text-body font-medium hover:bg-accent-hover transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="w-[18px] h-[18px]" aria-hidden="true" />
              前往學習
            </a>
          )}

          {showFeedback && (
            <p role="status" aria-live="polite" className="text-caption text-success font-medium">
              ✓ 已加入有興趣的課
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
