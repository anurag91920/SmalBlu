import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Fab,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Business as BusinessIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
  try {
    const response = await axios.get('/api/businesses');

    // 👉 Defensive check
    const data = Array.isArray(response.data) ? response.data : [];
    setBusinesses(data);
  } catch (err) {
    setError('Failed to fetch businesses');
  } finally {
    setLoading(false);
  }
};


  const handleCreateBusiness = () => {
    navigate('/business/new');
  };

  const handleEditBusiness = (id) => {
    navigate(`/business/edit/${id}`);
  };

  const handleViewBusinesses = () => {
    navigate('/businesses');
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Welcome back, {user?.name}! Manage your business profiles here.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <BusinessIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {businesses.length}
                    </Typography>
                    <Typography color="text.secondary">
                      Total Businesses
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Businesses */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Recent Businesses
          </Typography>
          {businesses.length === 0 ? (
            <Card>
              <CardContent>
                <Typography variant="body1" color="text.secondary" align="center">
                  No businesses found. Create your first business profile to get started!
                </Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateBusiness}
                  >
                    Create Business
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {businesses.slice(0, 3).map((business) => (
                <Grid item xs={12} sm={6} md={4} key={business._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {business.name}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {business.category}
                      </Typography>
                      <Typography variant="body2">
                        {business.description?.substring(0, 100)}
                        {business.description?.length > 100 ? '...' : ''}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditBusiness(business._id)}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Quick Actions */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                onClick={handleCreateBusiness}
                sx={{ py: 2 }}
              >
                Create New Business
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<ViewIcon />}
                onClick={handleViewBusinesses}
                sx={{ py: 2 }}
              >
                View All Businesses
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={handleCreateBusiness}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
};

export default Dashboard;
