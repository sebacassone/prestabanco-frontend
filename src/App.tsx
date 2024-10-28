import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar></Navbar>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
