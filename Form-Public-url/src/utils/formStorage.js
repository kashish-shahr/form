// Utility functions for storing and retrieving forms via API
import { API_BASE_URL } from '../config/api'

export const saveForm = async (form) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.error || 'Failed to save form')
    }
    return data.form
  } catch (error) {
    console.error('Error saving form:', error)
    throw error
  }
}

export const getForm = async (formId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/forms/${formId}`)
    const data = await response.json()
    
    if (!data.success) {
      return null
    }
    return data.form
  } catch (error) {
    console.error('Error fetching form:', error)
    return null
  }
}

export const getForms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/forms`)
    const data = await response.json()
    return data.success ? data.forms : []
  } catch (error) {
    console.error('Error fetching forms:', error)
    return []
  }
}

export const generateFormId = () => {
  return `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const saveFormResponse = async (formId, response) => {
  try {
    const responseData = await fetch(`${API_BASE_URL}/api/forms/${formId}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    })
    
    const data = await responseData.json()
    if (!data.success) {
      throw new Error(data.error || 'Failed to save response')
    }
    return data
  } catch (error) {
    console.error('Error saving form response:', error)
    throw error
  }
}

export const getFormResponses = async (formId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/forms/${formId}/responses`)
    const data = await response.json()
    return data.success ? data.responses : []
  } catch (error) {
    console.error('Error fetching form responses:', error)
    return []
  }
}

