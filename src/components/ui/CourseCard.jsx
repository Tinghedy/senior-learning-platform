export default function CourseCard({ illustration, title, subtitle }) {
  return (
    <div
      className="w-full rounded-card-lg flex items-center overflow-hidden"
      style={{
        background:  'var(--gradient-primary)',
        paddingTop:    'var(--space-sm)',
        paddingBottom: 'var(--space-sm)',
        paddingLeft:   'var(--space-md)',
        paddingRight:  'var(--space-2xl)',
        minHeight: '160px',
      }}
    >
      {/* 左側插畫 — 尺寸依 Figma 規格 108×73 */}
      <img
        src={illustration}
        alt=""
        aria-hidden="true"
        width={108}
        height={73}
        className="flex-shrink-0 object-contain"
      />

      {/* 右側文字 */}
      <div
        className="flex-1 min-w-0 flex flex-col justify-center gap-xs"
        style={{ marginLeft: 'var(--space-md)' }}
      >
        {/* 主標題：最近字級 token h3 = 24px；行高 tight */}
        <p className="text-h3 font-bold text-text-on-accent">
          {title}
        </p>
        {/* 副標題：caption = 16px，符合無障礙字級地板 */}
        <p className="text-caption text-text-on-accent">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
