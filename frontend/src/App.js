import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Context
import { AuthProvider } from './contexts/AuthContext'; // ✅ Make sure this path is correct

// Components
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import BusinessList from './components/BusinessList';
import BusinessForm from './components/BusinessForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider> {/* ✅ Wrap your entire app with AuthProvider */}
        <Router>
          <Navbar />
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Routes>
             
              <Route path="/register" element={<Register />} />
               <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/businesses"
                element={
                  <PrivateRoute>
                    <BusinessList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/business/new"
                element={
                  <PrivateRoute>
                    <BusinessForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/business/edit/:id"
                element={
                  <PrivateRoute>
                    <BusinessForm />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Private Route Component
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/register" />;
}

export default App;
