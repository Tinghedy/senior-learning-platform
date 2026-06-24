import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline'

const tabs = [
  { to: '/',          label: '首頁',        Icon: HomeIcon },
  { to: '/find',      label: '找課程',      Icon: MagnifyingGlassIcon },
  { to: '/saved',     label: '有興趣的課',   Icon: StarIcon },
  { to: '/voice',     label: '問問題',       Icon: MicrophoneIcon },
]

export default function TabBar() {
  return (
    <nav aria-label="主要導覽" className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border">
      <ul className="flex" role="list">
        {tabs.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center justify-center gap-xs min-h-[56px] w-full text-caption transition-colors',
                  isActive
                    ? 'text-accent font-bold'
                    : 'text-text-muted font-medium',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className="w-[28px] h-[28px]"
                    aria-hidden="true"
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
