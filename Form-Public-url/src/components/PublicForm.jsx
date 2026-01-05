import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getForm, saveFormResponse } from '../utils/formStorage'
import './PublicForm.css'

function PublicForm() {
  const { formId } = useParams()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(null)
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadForm = async () => {
      try {
        const loadedForm = await getForm(formId)
        if (loadedForm) {
          setForm(loadedForm)
          // Initialize form data with URL parameters or empty values
          const initialData = {}
          loadedForm.fields.forEach(field => {
            // Check if URL parameter exists for this field
            const paramValue = searchParams.get(field.id)
            initialData[field.id] = paramValue || ''
          })
          setFormData(initialData)
        }
      } catch (error) {
        console.error('Error loading form:', error)
      } finally {
        setLoading(false)
      }
    }
    loadForm()
  }, [formId, searchParams])

  const handleChange = (fieldId, value) => {
    setFormData({
      ...formData,
      [fieldId]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    for (const field of form.fields) {
      const value = formData[field.id]?.trim() || ''
      
      // Check if field is empty
      if (!value) {
        alert(`Please fill in the ${field.label} field`)
        return
      }
      
      // Validate email format
      if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          alert('Please enter a valid email address')
          return
        }
      }
    }

    // Save response
    try {
      await saveFormResponse(formId, formData)
      setSubmitted(true)
    } catch (error) {
      alert('Failed to submit form. Please try again.')
      console.error(error)
    }
  }

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            className="input"
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required
          />
        )
      
      case 'textarea':
        return (
          <textarea
            className="input"
            rows="4"
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required
          />
        )
      
      case 'select':
        return (
          <select
            className="input"
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required
          >
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      
      default:
        return (
          <input
            type="text"
            className="input"
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required
          />
        )
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p>Loading form...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="container">
        <div className="card">
          <h2>Form Not Found</h2>
          <p>The form you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="container">
        <div className="card submit-success">
          <h2>✓ Form Submitted Successfully!</h2>
          <p>Thank you for your submission.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="form-title">{form.title}</h1>
        {form.description && (
          <p className="form-description">{form.description}</p>
        )}

        <form onSubmit={handleSubmit}>
          {form.fields.map(field => (
            <div key={field.id} className="form-group">
              <label className="label">
                {field.label}
                <span style={{ color: '#d32f2f' }}> *</span>
              </label>
              {renderField(field)}
            </div>
          ))}

          <button type="submit" className="submit-btn">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  )
}

export default PublicForm

