import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Grid,
  Container
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 30, marginTop: 50 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar style={{ width: 80, height: 80, marginBottom: 20 }}>
            {(user?.businessName || user?.name || 'U')[0].toUpperCase()}
          </Avatar>

          <Typography variant="h5" gutterBottom>
            {user?.businessName || user?.name || 'Unknown User'}
          </Typography>

          <Typography variant="body1" color="textSecondary">
            {user?.email || 'No email'}
          </Typography>

          <Divider style={{ margin: '30px 0', width: '100%' }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">User ID</Typography>
              <Typography variant="body2" color="textSecondary">
                {user?.id || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Role</Typography>
              <Typography variant="body2" color="textSecondary">
                {user?.role || 'User'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
