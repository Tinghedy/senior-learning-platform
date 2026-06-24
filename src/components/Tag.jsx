import {
  PlayCircleIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

const TYPE_CONFIG = {
  video:   { label: '影片', Icon: PlayCircleIcon,         color: 'text-success bg-[#E8F5EE] border border-success' },
  article: { label: '文章', Icon: DocumentTextIcon,       color: 'text-text-secondary bg-sunken border border-border' },
  online:  { label: '線上', Icon: GlobeAltIcon,           color: 'text-accent bg-accent-subtle border border-accent' },
  offline: { label: '線下', Icon: MapPinIcon,             color: 'text-warning bg-warning-bg border border-warning' },
  phone:   { label: '手機操作', Icon: DevicePhoneMobileIcon, color: 'text-text-secondary bg-sunken border border-border' },
  ai:      { label: 'AI 入門',  Icon: CpuChipIcon,           color: 'text-text-secondary bg-sunken border border-border' },
  shopping:{ label: '網路購物', Icon: ShoppingCartIcon,       color: 'text-text-secondary bg-sunken border border-border' },
  health:  { label: '健保查詢', Icon: HeartIcon,              color: 'text-text-secondary bg-sunken border border-border' },
}

export default function Tag({ type }) {
  const config = TYPE_CONFIG[type]
  if (!config) return null
  const { label, Icon, color } = config
  return (
    <span className={`inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-sm text-caption font-medium ${color}`}>
      <Icon className="w-[14px] h-[14px] shrink-0" aria-hidden="true" />
      {label}
    </span>
  )
}
