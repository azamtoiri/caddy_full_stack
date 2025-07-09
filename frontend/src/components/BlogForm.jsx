import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useBlog, useBlogMutation } from '../hooks/useBlog'

const BlogForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  
  const { blog, loading: blogLoading } = useBlog(isEditing ? id : null)
  const { createBlog, updateBlog, loading, error } = useBlogMutation()

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })

  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    if (isEditing && blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
      })
    }
  }, [isEditing, blog])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    } else if (formData.title.length > 200) {
      errors.title = 'Title must be less than 200 characters'
    }
    
    if (!formData.content.trim()) {
      errors.content = 'Content is required'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      if (isEditing) {
        await updateBlog(id, formData)
        navigate(`/blog/${id}`)
      } else {
        const newBlog = await createBlog(formData)
        navigate(`/blog/${newBlog.id}`)
      }
    } catch (error) {
      console.error('Failed to save blog:', error)
    }
  }

  if (isEditing && blogLoading) {
    return <div className="text-center text-gray-500">Loading blog...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Blogs
        </Link>
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter blog title..."
            maxLength={200}
          />
          {validationErrors.title && (
            <span className="text-red-500 text-sm mt-1">{validationErrors.title}</span>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.content ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Write your blog content here..."
            rows={15}
          />
          {validationErrors.content && (
            <span className="text-red-500 text-sm mt-1">{validationErrors.content}</span>
          )}
        </div>

        {error && <div className="text-red-500 mb-4">Error: {error}</div>}

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm