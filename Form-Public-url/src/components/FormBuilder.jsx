import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveForm, generateFormId, getForms } from '../utils/formStorage'
import './FormBuilder.css'

const DEFAULT_FIELDS = [
  { id: 'name', label: 'Name', type: 'text', enabled: true },
  { id: 'email', label: 'Email', type: 'email', enabled: true },
  { id: 'message', label: 'Message', type: 'textarea', enabled: true },
  { id: 'customerType', label: 'Type of Customer', type: 'select', enabled: true, options: ['New', 'Returning', 'VIP', 'Premium'] },
  { id: 'age', label: 'Age', type: 'number', enabled: true }
]

function FormBuilder() {
  const navigate = useNavigate()
  const [formTitle, setFormTitle] = useState('Customer Feedback Form')
  const [formDescription, setFormDescription] = useState('Please fill out this form to provide your feedback')
  const [fields, setFields] = useState(DEFAULT_FIELDS)
  const [formId, setFormId] = useState(null)
  const [publicLink, setPublicLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [prefillValues, setPrefillValues] = useState({})

  useEffect(() => {
    // Generate form ID on mount
    const id = generateFormId()
    setFormId(id)
    setPublicLink(`${window.location.origin}/form/${id}`)
  }, [])

  const toggleField = (fieldId) => {
    setFields(fields.map(field =>
      field.id === fieldId ? { ...field, enabled: !field.enabled } : field
    ))
  }

  const handleCreateLink = async () => {
    const enabledFields = fields.filter(f => f.enabled)

    if (enabledFields.length === 0) {
      alert('Please enable at least one field')
      return
    }

    const form = {
      id: formId,
      title: formTitle,
      description: formDescription,
      fields: enabledFields,
      createdAt: new Date().toISOString()
    }

    try {
      await saveForm(form)
      setPublicLink(`${window.location.origin}/form/${formId}`)
    } catch (error) {
      alert('Failed to save form. Please try again.')
      console.error(error)
    }
  }

  const copyToClipboard = (linkToCopy = publicLink) => {
    navigator.clipboard.writeText(linkToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrefillChange = (fieldId, value) => {
    setPrefillValues({
      ...prefillValues,
      [fieldId]: value
    })
  }

  const generateParameterizedLink = () => {
    if (!formId) return ''

    const baseLink = `${window.location.origin}/form/${formId}`
    const params = new URLSearchParams()

    // Add only non-empty prefill values as URL parameters
    Object.entries(prefillValues).forEach(([fieldId, value]) => {
      if (value && value.trim() !== '') {
        params.append(fieldId, value.trim())
      }
    })

    const paramString = params.toString()
    return paramString ? `${baseLink}?${paramString}` : baseLink
  }

  const getParameterizedLink = () => {
    return generateParameterizedLink()
  }

  return (
    <div className="container">
      <div className="builder-header">
        <h1>Form Builder</h1>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Home
        </button>
      </div>

      <div className="card">
        <div className="form-group">
          <label className="label">Form Title</label>
          <input
            type="text"
            className="input"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Enter form title"
          />
        </div>

        <div className="form-group">
          <label className="label">Form Description</label>
          <input
            type="text"
            className="input"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Enter form description"
          />
        </div>
      </div>

      <div className="card">
        <h2>Form Fields</h2>
        <p className="field-instruction">Toggle fields on/off to include them in your form. Set pre-fill values to auto-populate fields when users open the link.</p>

        {fields.map(field => (
          <div key={field.id} className={`field-item ${field.enabled ? 'enabled' : ''}`}>
            <div className="field-header">
              <div>
                <span className="field-name">{field.label}</span>
                <span className="field-type"> ({field.type})</span>
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id={field.id}
                  checked={field.enabled}
                  onChange={() => toggleField(field.id)}
                />
                <label htmlFor={field.id}>
                  {field.enabled ? 'Enabled' : 'Disabled'}
                </label>
              </div>
            </div>

            {field.enabled && (
              <div className="prefill-field-section">
                <label className="prefill-label">Pre-fill Value (Optional):</label>
                {field.type === 'select' ? (
                  <select
                    className="prefill-input"
                    value={prefillValues[field.id] || ''}
                    onChange={(e) => handlePrefillChange(field.id, e.target.value)}
                  >
                    <option value="">None - User will select</option>
                    {field.options?.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
                    className="prefill-input"
                    value={prefillValues[field.id] || ''}
                    onChange={(e) => handlePrefillChange(field.id, e.target.value)}
                    placeholder={`Leave empty to let user fill (e.g., ${field.type === 'email' ? 'customer@example.com' : field.type === 'number' ? '25' : 'John Doe'})`}
                  />
                )}
                {prefillValues[field.id] && (
                  <span className="prefill-indicator">✓ Will be pre-filled</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <button className="btn btn-primary btn-large" onClick={handleCreateLink}>
          Create Public Form Link
        </button>

        {publicLink && (
          <>
            <div className="link-display">
              <h3>Your Public Form Links:</h3>

              {/* Regular Link */}
              <div style={{ marginBottom: '20px' }}>
                <label className="label" style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                  Standard Link (No pre-filled values):
                </label>
                <div className="link-box">
                  <input
                    type="text"
                    className="link-input"
                    value={publicLink}
                    readOnly
                  />
                  <button className="copy-btn" onClick={() => copyToClipboard(publicLink)}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Parameterized Link */}
              {Object.keys(prefillValues).some(key => prefillValues[key] && prefillValues[key].trim() !== '') && (
                <div style={{ marginBottom: '20px', padding: '16px', background: '#e8f5e9', borderRadius: '6px', border: '1px solid #4caf50' }}>
                  <label className="label" style={{ fontSize: '14px', marginBottom: '8px', display: 'block', color: '#2e7d32' }}>
                    ✨ Link with Pre-filled Values:
                  </label>
                  <div className="link-box">
                    <input
                      type="text"
                      className="link-input"
                      value={getParameterizedLink()}
                      readOnly
                      style={{ fontSize: '12px' }}
                    />
                    <button className="copy-btn" onClick={() => copyToClipboard(getParameterizedLink())}>
                      Copy
                    </button>
                  </div>
                  <p style={{ marginTop: '8px', fontSize: '12px', color: '#2e7d32' }}>
                    Use this link when sending personalized forms. Fields will be auto-filled based on your settings above.
                  </p>
                  <div style={{ marginTop: '12px' }}>
                    <a
                      href={getParameterizedLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success"
                      style={{ fontSize: '14px', padding: '8px 16px' }}
                    >
                      Test Pre-filled Form
                    </a>
                  </div>
                </div>
              )}

              {copied && (
                <div className="success-message">
                  Link copied to clipboard!
                </div>
              )}

              <div style={{ marginTop: '16px' }}>
                <a href={publicLink} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                  Open Standard Form in New Tab
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FormBuilder

