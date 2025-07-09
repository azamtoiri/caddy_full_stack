import { useState, useEffect } from 'react'
import { blogApi } from '../api/client'

// Хук для получения списка блогов
export const useBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchBlogs = async () => {
        try {
        setLoading(true)
        setError(null)
        const response = await blogApi.getBlogs()
        setBlogs(response.data)
        } catch (err) {
        setError(err.message)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return { blogs, loading, error, refetch: fetchBlogs }
}

    // Хук для получения одного блога
    export const useBlog = (id) => {
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBlog = async () => {
        if (!id) return
        
        try {
            setLoading(true)
            setError(null)
            const response = await blogApi.getBlog(id)
            setBlog(response.data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
        }

        fetchBlog()
    }, [id])

    return { blog, loading, error }
}

// Хук для создания/обновления блога
export const useBlogMutation = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createBlog = async (data) => {
        try {
        setLoading(true)
        setError(null)
        const response = await blogApi.createBlog(data)
        return response.data
        } catch (err) {
        setError(err.message)
        throw err
        } finally {
        setLoading(false)
        }
    }

    const updateBlog = async (id, data) => {
        try {
        setLoading(true)
        setError(null)
        const response = await blogApi.updateBlog(id, data)
        return response.data
        } catch (err) {
        setError(err.message)
        throw err
        } finally {
        setLoading(false)
        }
    }

    const deleteBlog = async (id) => {
        try {
        setLoading(true)
        setError(null)
        await blogApi.deleteBlog(id)
        } catch (err) {
        setError(err.message)
        throw err
        } finally {
        setLoading(false)
        }
    }

    return { createBlog, updateBlog, deleteBlog, loading, error }
}