export default function GenericTable({ title, columns = [], rows = [] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{title}</h1>
        <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/40 dark:bg-white/5">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className="text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200">{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx} className="border-t">
                    {columns.map((c) => (
                      <td key={c.key} className="px-3 py-2 text-slate-900 dark:text-slate-100">{r[c.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && (
            <div className="p-4 text-slate-500 dark:text-slate-300">No data</div>
          )}
        </div>
      </div>
    </div>
  )
}
