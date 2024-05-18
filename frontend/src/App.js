import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

import AddProperty from './pages/AddProperty'
import PropertyList from './pages/PropertyList'
import MyProperties from './pages/MyProperties'
import PropertyDetails from './pages/PropertyDetails'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  const { user } = useAuthContext()

  // Function to check if user is a seller
  const isSeller = () => {
    return user && user.role === 'seller';
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Render PropertyList only if user is not a seller */}
            
              <Route path="/" element={user ? <PropertyList /> : <Navigate to="/login"/>} />
           
            
            <Route 
              path="/add-property" 
              element={isSeller() ? <AddProperty /> : <Navigate to="/" />} 
            />
            <Route 
              path="/my-property" 
              element={isSeller() ? <MyProperties /> : <Navigate to="/" />} 
            />
            <Route path="/property/:propertyId" element={!isSeller() ? <PropertyDetails /> : <Navigate to="/" /> } />
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
