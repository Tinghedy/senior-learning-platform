import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DevicePhoneMobileIcon,
  CpuChipIcon,
  ShoppingCartIcon,
  HeartIcon,
  CameraIcon,
  PlayCircleIcon,
  BuildingLibraryIcon,
  EllipsisHorizontalCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import TopBar from '../components/TopBar'
import SearchField from '../components/SearchField'

const ANNOUNCEMENTS = [
  { id: 1, type: '新課程', title: 'LINE 視訊免費課程開放報名！', subtitle: '手把手教學，不怕學不會' },
  { id: 2, type: '活動',   title: '6/28 台南線下拍照課，名額有限', subtitle: '帶著手機就能來，現場實際操作' },
  { id: 3, type: '公告',   title: '系統更新：新增語音問答功能', subtitle: '說出你的問題，AI 幫你解答' },
]

const CATEGORY_LIST = [
  { id: 'phone',         label: '手機操作', Icon: DevicePhoneMobileIcon },
  { id: 'ai',            label: 'AI 入門',  Icon: CpuChipIcon },
  { id: 'shopping',      label: '網路購物', Icon: ShoppingCartIcon },
  { id: 'health',        label: '健保查詢', Icon: HeartIcon },
  { id: 'photo',         label: '拍照修圖', Icon: CameraIcon },
  { id: 'entertainment', label: '影音娛樂', Icon: PlayCircleIcon },
  { id: 'banking',       label: '網路銀行', Icon: BuildingLibraryIcon },
  { id: 'more',          label: '更多',     Icon: EllipsisHorizontalCircleIcon },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)

  function handleCategoryClick(id) {
    navigate(`/find?category=${id}`)
  }

  return (
    <main>
      <TopBar title="樂齡學習平台" />

      <div className="px-md pt-md pb-[calc(var(--touch-target)+80px)] flex flex-col gap-xl">

        {/* 最新消息輪播 */}
        <section aria-label="最新消息">
          <div className="relative overflow-hidden rounded-lg">
            {/* 輪播主體 */}
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${slide * 100}%)` }}
              aria-live="polite"
              aria-atomic="true"
            >
              {ANNOUNCEMENTS.map((item, i) => (
                <div
                  key={item.id}
                  className="min-w-full bg-accent-subtle border-[1.5px] border-accent rounded-lg p-lg flex flex-col gap-sm"
                  aria-hidden={i !== slide}
                >
                  <span className="text-caption font-bold text-accent uppercase">{item.type}</span>
                  <h2 className="text-body-lg font-bold text-text-primary">{item.title}</h2>
                  <p className="text-body text-text-secondary">{item.subtitle}</p>
                </div>
              ))}
            </div>

            {/* 前後按鈕 */}
            <button
              type="button"
              onClick={() => setSlide(s => Math.max(0, s - 1))}
              disabled={slide === 0}
              aria-label="上一則"
              className="absolute left-sm top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center bg-card/80 rounded-full disabled:opacity-30"
            >
              <ChevronLeftIcon className="w-[20px] h-[20px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setSlide(s => Math.min(ANNOUNCEMENTS.length - 1, s + 1))}
              disabled={slide === ANNOUNCEMENTS.length - 1}
              aria-label="下一則"
              className="absolute right-sm top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center bg-card/80 rounded-full disabled:opacity-30"
            >
              <ChevronRightIcon className="w-[20px] h-[20px]" aria-hidden="true" />
            </button>
          </div>

          {/* 圓點指示 */}
          <div className="flex justify-center gap-sm mt-sm" role="tablist" aria-label="輪播頁碼">
            {ANNOUNCEMENTS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === slide}
                aria-label={`第 ${i + 1} 則`}
                onClick={() => setSlide(i)}
                className={[
                  'w-[10px] h-[10px] rounded-full transition-colors',
                  i === slide ? 'bg-accent' : 'bg-border',
                ].join(' ')}
              />
            ))}
          </div>
        </section>

        {/* 搜尋欄 */}
        <SearchField
          id="home-search"
          placeholder="搜尋課程……"
          onFocus={() => navigate('/find')}
          onChange={() => navigate('/find')}
        />

        {/* 學習類別格狀 */}
        <section aria-label="學習類別">
          <h2 className="text-h3 font-bold text-text-primary mb-md">學習類別</h2>
          <ul className="grid grid-cols-3 gap-sm" role="list">
            {CATEGORY_LIST.map(({ id, label, Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(id)}
                  className="flex flex-col items-center justify-center gap-sm w-full min-h-[88px] bg-card border-[1.5px] border-border rounded-md hover:border-accent hover:bg-accent-subtle transition-colors"
                >
                  <Icon className="w-[32px] h-[32px] text-accent" aria-hidden="true" />
                  <span className="text-caption font-medium text-text-primary">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  )
}
