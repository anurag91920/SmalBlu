import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusinessList = () => {
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Backend से बिजनेस लोड करें
  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/business');
      setBusiness(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load businesses');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  // Delete बिजनेस
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this business?')) return;

    try {
      await axios.delete(`/api/business/${id}`);
      // Delete के बाद लिस्ट रीफ्रेश करें
      fetchBusiness();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete business');
    }
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Business List</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/business/new')}>
          Add New Business
        </Button>
      </Box>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : business.length === 0 ? (
        <Typography>No businesses found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Business Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {business.map((business) => (
                <TableRow key={business._id}>
                  <TableCell>{business.name}</TableCell>
                  <TableCell>{business.description}</TableCell>
                  <TableCell>{business.location}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/business/edit/${business._id}`)}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(business._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default BusinessList;
