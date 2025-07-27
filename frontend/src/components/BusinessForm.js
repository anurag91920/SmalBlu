import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Box
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BusinessForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For editing existing business

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    phone: '',
    contactEmail: '',
    website: '',
    category: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`/api/business/${id}`)
        .then(res => {
          setFormData({
            name: res.data.name || '',
            description: res.data.description || '',
            location: res.data.location || '',
            phone: res.data.phone || '',
            contactEmail: res.data.contactEmail || '',
            website: res.data.website || '',
            category: res.data.category || '',
          });
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load business data');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple client-side validation
    if (!formData.phone || !formData.contactEmail || !formData.website || !formData.category) {
      setError('Please fill in all required fields: Phone, Contact Email, Website, and Category.');
      return;
    }

    setLoading(true);

    try {
      if (id) {
        await axios.put(`/api/business/${id}`, formData);
      } else {
        await axios.post('/api/business', formData);
      }
      navigate('/businesses');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Edit Business' : 'Add New Business'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Business Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Contact Email"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

         <TextField
           select
           label="Category"
           name="category"
           value={formData.category}
           onChange={handleChange}
           fullWidth
           required
           SelectProps={{
           native: true,
           }}
           margin="normal"
         >
          <option value=""></option>
          <option value="Retail">Retail</option>
          <option value="Service">Service</option>
          <option value="Technology">Technology</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Health">Health</option>
        </TextField>



          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3 }}
            fullWidth
          >
            {loading ? (id ? 'Updating...' : 'Creating...') : (id ? 'Update Business' : 'Add Business')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BusinessForm;
