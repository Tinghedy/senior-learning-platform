import { useParams, useNavigate } from 'react-router-dom'
import { SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import TopBar from '../components/TopBar'
import { courses } from '../data/courses'

export default function AISummaryPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const course = courses.find(c => c.id === Number(courseId))

  if (!course) {
    return (
      <main>
        <TopBar title="AI 講重點" showBack />
        <div className="px-md pt-xl text-center text-text-muted">找不到這堂課</div>
      </main>
    )
  }

  return (
    <main>
      <TopBar title="AI 講重點" showBack />

      <div className="px-md pt-lg pb-[calc(var(--touch-target)+80px)] flex flex-col gap-lg">

        {/* 標題區 */}
        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-xs text-accent">
            <SparklesIcon className="w-[22px] h-[22px]" aria-hidden="true" />
            <span className="text-body font-bold">AI 幫你整理這堂課的重點</span>
          </div>
          <h2 className="text-h3 font-bold text-text-primary leading-snug">{course.title}</h2>
        </div>

        {/* 重點列表 */}
        <ul className="flex flex-col gap-md" role="list">
          {course.summary.map((point, i) => (
            <li key={i} className="flex gap-md bg-card border-[1.5px] border-border rounded-md p-md shadow-[0_1px_3px_#00000014]">
              <CheckCircleIcon className="w-[28px] h-[28px] text-accent shrink-0 mt-[2px]" aria-hidden="true" />
              <span className="text-body-lg text-text-primary leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        {/* 回去按鈕 */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="min-h-touch rounded-pill border-[1.5px] border-border text-body font-medium text-text-secondary hover:border-accent hover:text-accent transition-colors"
        >
          回到課程
        </button>

      </div>
    </main>
  )
}
