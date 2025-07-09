import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

// Создаем экземпляр axios
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Интерсептор для обработки ошибок
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
    }
)

// API методы для блога
export const blogApi = {
    // Получить все посты
    getBlogs: (params = {}) => apiClient.get('/blog/', { params }),
    
    // Получить один пост
    getBlog: (id) => apiClient.get(`/blog/${id}/`),
    
    // Создать новый пост
    createBlog: (data) => apiClient.post('/blog/', data),
    
    // Обновить пост
    updateBlog: (id, data) => apiClient.put(`/blog/${id}/`, data),
    
    // Частично обновить пост
    patchBlog: (id, data) => apiClient.patch(`/blog/${id}/`, data),
    
    // Удалить пост
    deleteBlog: (id) => apiClient.delete(`/blog/${id}/`),
    
    // Пинг для проверки соединения
    ping: () => apiClient.get('/ping/'),
    }

export default apiClient