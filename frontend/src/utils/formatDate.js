import { format, parseISO } from 'date-fns'

export const formatDate = (dateString) => {
    if (!dateString) return ''
    
    try {
        const date = parseISO(dateString)
        return format(date, 'MMM dd, yyyy')
    } catch (error) {
        return dateString
    }
}

export const formatDateTime = (dateString) => {
    if (!dateString) return ''
    
    try {
        const date = parseISO(dateString)
        return format(date, 'MMM dd, yyyy HH:mm')
    } catch (error) {
        return dateString
    }
}