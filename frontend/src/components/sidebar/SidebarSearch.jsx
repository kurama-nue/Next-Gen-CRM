export default function SidebarSearch({ value, onChange }) {
  return (
    <div className="px-6 pb-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white/20 dark:bg-white/10 border border-white/30 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-white/60"
        placeholder="Search menu"
      />
    </div>
  )
}
