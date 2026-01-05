import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Form Builder</h1>
        <p className="subtitle">Create and share forms easily</p>
        <Link to="/builder" className="btn btn-primary">
          Create New Form
        </Link>
      </div>
    </div>
  )
}

export default Home

