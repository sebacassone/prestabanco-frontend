import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import './App.css'
import NotFound from './components/NotFound';
import RegisterUser from './components/RegisterUser';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register-user" element={<RegisterUser />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
