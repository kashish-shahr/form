import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const DATA_DIR = join(__dirname, 'data')

// Ensure data directory exists
fs.mkdir(DATA_DIR, { recursive: true }).catch(console.error)

// CORS configuration - allow frontend origin or all origins in development
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}
app.use(cors(corsOptions))
app.use(express.json())

// Helper functions for file operations
const getFormsFile = () => join(DATA_DIR, 'forms.json')
const getResponsesFile = (formId) => join(DATA_DIR, `responses_${formId}.json`)

async function readForms() {
  try {
    const data = await fs.readFile(getFormsFile(), 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

async function writeForms(forms) {
  await fs.writeFile(getFormsFile(), JSON.stringify(forms, null, 2))
}

async function readResponses(formId) {
  try {
    const data = await fs.readFile(getResponsesFile(formId), 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

async function writeResponses(formId, responses) {
  await fs.writeFile(getResponsesFile(formId), JSON.stringify(responses, null, 2))
}

// API Routes

// Create or update a form
app.post('/api/forms', async (req, res) => {
  try {
    const form = req.body
    const forms = await readForms()
    const existingIndex = forms.findIndex(f => f.id === form.id)
    
    if (existingIndex >= 0) {
      forms[existingIndex] = form
    } else {
      forms.push(form)
    }
    
    await writeForms(forms)
    res.json({ success: true, form })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get a form by ID
app.get('/api/forms/:formId', async (req, res) => {
  try {
    const { formId } = req.params
    const forms = await readForms()
    const form = forms.find(f => f.id === formId)
    
    if (!form) {
      return res.status(404).json({ success: false, error: 'Form not found' })
    }
    
    res.json({ success: true, form })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get all forms
app.get('/api/forms', async (req, res) => {
  try {
    const forms = await readForms()
    res.json({ success: true, forms })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Submit a form response
app.post('/api/forms/:formId/responses', async (req, res) => {
  try {
    const { formId } = req.params
    const response = req.body
    
    // Verify form exists
    const forms = await readForms()
    const form = forms.find(f => f.id === formId)
    
    if (!form) {
      return res.status(404).json({ success: false, error: 'Form not found' })
    }
    
    const responses = await readResponses(formId)
    responses.push({
      ...response,
      submittedAt: new Date().toISOString()
    })
    
    await writeResponses(formId, responses)
    res.json({ success: true, message: 'Response saved successfully' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get form responses
app.get('/api/forms/:formId/responses', async (req, res) => {
  try {
    const { formId } = req.params
    const responses = await readResponses(formId)
    res.json({ success: true, responses })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

