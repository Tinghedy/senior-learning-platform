import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function TopBar({ title, showBack = false, rightContent }) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-20 bg-page border-b border-border">
      <div className="flex items-center min-h-touch px-md gap-sm">
        {showBack && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="回上一步"
            className="flex items-center justify-center min-h-touch min-w-touch rounded-md -ml-sm text-text-primary"
          >
            <ChevronLeftIcon className="w-[28px] h-[28px]" aria-hidden="true" />
          </button>
        )}
        <h1 className={`text-h3 font-bold text-text-primary flex-1 ${showBack ? '' : 'pl-xs'}`}>
          {title}
        </h1>
        {rightContent && (
          <div className="text-caption text-text-muted shrink-0">{rightContent}</div>
        )}
      </div>
    </header>
  )
}
