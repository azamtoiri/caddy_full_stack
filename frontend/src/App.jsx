import { Routes, Route, Link } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogDetail from './components/BlogDetail'
import BlogForm from './components/BlogForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/">📝 Блог</Link>
          </h1>
          <nav className="space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">
              Все блоги
            </Link>
            <Link to="/create" className="text-blue-600 hover:underline">
              Создать блог
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/blog/:id/edit" element={<BlogForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
