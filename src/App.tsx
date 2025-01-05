import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';
import NotFound from './components/NotFound';
import RegisterUser from './components/register/RegisterUser';
import SimulationCredit from './components/intranet/simulation/SimulationCredit';
import { useEffect, useState } from 'react';
import ClientView from './components/intranet/ClientView';
import ExecutiveView from './components/intranet/ExecutiveView';
import userObject from './interfaces/UserObject';
import ViewRequests from './components/intranet/requests/viewRequests';
import ViewAllRequests from './components/intranet/requests/viewAllRequests';
import CatWithMoney from './components/loading/index';

function App() {
  const [userType, setUserType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: userObject = JSON.parse(storedUser);
      setUserType(user.typeUser); // Recupera y establece el tipo de usuario
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <CatWithMoney />
      </div>
    ); // O cualquier componente de carga que prefieras
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/credit-simulator" element={<SimulationCredit />} />
          <Route path="/view-requests" element={<ViewRequests />} />
          <Route path="/view-all-requests" element={<ViewAllRequests />} />
          <Route
            path="/intranet"
            element={
              userType === 'Client' ? (
                <ClientView />
              ) : userType === 'Executive' ? (
                <ExecutiveView />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
