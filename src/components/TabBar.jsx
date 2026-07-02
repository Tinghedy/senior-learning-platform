import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline'

const tabs = [
  { to: '/',      label: '首頁',      Icon: HomeIcon },
  { to: '/find',  label: '找課程',    Icon: MagnifyingGlassIcon },
  { to: '/saved', label: '有興趣',    Icon: StarIcon },
  { to: '/voice', label: '問問題',    Icon: MicrophoneIcon },
]

export default function TabBar() {
  return (
    <nav aria-label="主要導覽" className="shrink-0 z-30 bg-accent shadow-sm">
      <div className="flex items-center h-[56px] px-md">
        {/* 左：App 名稱 */}
        <span className="text-text-on-accent font-bold text-body flex-1 tracking-wide">
          樂齡學習平台
        </span>

        {/* 右：四個 icon 按鈕 */}
        <ul className="flex items-center gap-xs" role="list">
          {tabs.map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                aria-label={label}
                className={({ isActive }) =>
                  [
                    'flex flex-col items-center justify-center gap-[3px] w-[52px] h-[44px] rounded-md text-[10px] font-medium transition-colors',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className="w-[22px] h-[22px]" aria-hidden="true" strokeWidth={isActive ? 2.5 : 1.5} />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
