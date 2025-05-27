import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CandidateForm from './components/CandidateForm';
import './App.css';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sistema de Gestión de Candidatos
        </Typography>
        <CandidateForm />
      </Box>
    </Container>
  );
}

export default App;