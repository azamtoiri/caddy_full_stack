import { Link } from 'react-router-dom'

export default function Header({ isAuthorized, onLogout }) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">📝 Блог</Link>
        </h1>
        <nav className="space-x-4 flex items-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Все блоги
          </Link>
          <Link to="/create" className="text-blue-600 hover:underline">
            Создать блог
          </Link>

          {isAuthorized ? (
            <button
              onClick={onLogout}
              className="text-red-600 hover:underline bg-transparent border-none cursor-pointer"
            >
              Выйти
            </button>
          ) : (
            <Link to="/login" className="text-blue-600 hover:underline">
              Вход
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
