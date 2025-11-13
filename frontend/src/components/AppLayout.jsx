import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700">
      <Header />
      <Sidebar />
      <main className="md:ml-64 pt-4">
        {children}
      </main>
    </div>
  )
}
