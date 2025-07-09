import { useParams, useNavigate, Link } from 'react-router-dom'
import { useBlog, useBlogMutation } from '../hooks/useBlog'
import { formatDateTime } from '../utils/formatDate'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { blog, loading, error } = useBlog(id)
  const { deleteBlog, loading: deleteLoading } = useBlogMutation()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id)
        navigate('/')
      } catch (error) {
        console.error('Failed to delete blog:', error)
      }
    }
  }

  if (loading) return <div className="text-center text-gray-500">Loading blog...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>
  if (!blog) return <div className="text-center text-red-500">Blog not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Blogs
        </Link>
        <div className="flex gap-4">
          <Link 
            to={`/blog/${blog.id}/edit`} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${
              deleteLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <article className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <div className="text-sm text-gray-500">
            <span>Created: {formatDateTime(blog.created_at)}</span>
            {blog.updated_at !== blog.created_at && (
              <span className="ml-4">Updated: {formatDateTime(blog.updated_at)}</span>
            )}
          </div>
        </header>

        <div className="prose prose-gray">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  )
}

export default BlogDetail