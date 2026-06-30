import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchField({ value, onChange, onFocus, placeholder = '搜尋課程……', id = 'search' }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">搜尋課程</label>
      <MagnifyingGlassIcon
        className="absolute left-md top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-text-muted pointer-events-none"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className="w-full min-h-touch pl-[48px] pr-md rounded-pill bg-sunken text-body text-text-primary placeholder:text-text-muted border-none outline-none focus-visible:outline-[3px] focus-visible:outline-focus"
      />
    </div>
  )
}
