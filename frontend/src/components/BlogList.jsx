import { Link } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlog'
import { formatDate } from '../utils/formatDate'

const BlogList = () => {
  const { blogs, loading, error, refetch } = useBlogs()

  if (loading) return <div className="text-center text-gray-500">Loading blogs...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <div className="flex gap-4">
          <button 
            onClick={refetch} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Refresh
          </button>
          <Link 
            to="/blog/create" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create New Post
          </Link>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No blog posts yet.</p>
          <Link 
            to="/blog/create" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="border rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link 
                    to={`/blog/${blog.id}`} 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {blog.title}
                  </Link>
                </h2>
                <div className="text-sm text-gray-500">
                  <span>{formatDate(blog.created_at)}</span>
                  {blog.updated_at !== blog.created_at && (
                    <span className="ml-4">
                      Updated: {formatDate(blog.updated_at)}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-gray-700 mb-4">
                <p>{blog.content.substring(0, 150)}...</p>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  to={`/blog/${blog.id}`} 
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Read More
                </Link>
                <Link 
                  to={`/blog/${blog.id}/edit`} 
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Edit
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogList