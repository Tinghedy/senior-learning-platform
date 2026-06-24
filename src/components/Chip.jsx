export default function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'inline-flex items-center justify-center shrink-0 min-h-[44px] px-md rounded-pill text-body font-medium transition-colors',
        selected
          ? 'bg-accent-subtle border-[2px] border-accent text-accent font-bold'
          : 'bg-card border-[1.5px] border-border text-text-primary',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
