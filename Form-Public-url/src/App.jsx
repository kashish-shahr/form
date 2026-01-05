import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FormBuilder from './components/FormBuilder'
import PublicForm from './components/PublicForm'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<FormBuilder />} />
        <Route path="/form/:formId" element={<PublicForm />} />
      </Routes>
    </Router>
  )
}

export default App

