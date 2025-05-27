import React, { useState, useCallback } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Autocomplete,
  Paper,
  Typography,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'debounce';
import { createCandidate, getAutocomplete, Candidate } from '../services/api';

const initialFormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  education: '',
  work_experience: '',
};

const CandidateForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<Record<string, string[]>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.first_name) newErrors.first_name = 'El nombre es requerido';
    if (!formData.last_name) newErrors.last_name = 'El apellido es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }
    if (!formData.address) newErrors.address = 'La dirección es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAutocomplete = useCallback(
    debounce(async (field: string, value: string) => {
      if (value.length >= 5) {
        try {
          const response = await getAutocomplete(field, value);
          setSuggestions(prev => ({
            ...prev,
            [field]: response.payload[field] || []
          }));
        } catch (error) {
          console.error('Error en autocompletado:', error);
        }
      }
    }, 300),
    []
  );

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'education' || field === 'work_experience') {
      handleAutocomplete(field, value);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija los errores en el formulario');
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    
    if (file) {
      formDataToSend.append('resume_file', file);
    }

    try {
      await createCandidate(formDataToSend);
      toast.success('Candidato creado exitosamente');
      handleClose();
    } catch (error) {
      toast.error('Error al crear el candidato');
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    setFile(null);
    setSuggestions({});
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Agregar Candidato
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Nuevo Candidato</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              value={formData.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              error={!!errors.first_name}
              helperText={errors.first_name}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Apellido"
              value={formData.last_name}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              error={!!errors.last_name}
              helperText={errors.last_name}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Teléfono"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Dirección"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
            />
            <Autocomplete
              freeSolo
              options={suggestions.education || []}
              value={formData.education}
              onChange={(_, value) => handleInputChange('education', value || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  label="Educación"
                  onChange={(e) => handleInputChange('education', e.target.value)}
                />
              )}
            />
            <Autocomplete
              freeSolo
              options={suggestions.work_experience || []}
              value={formData.work_experience}
              onChange={(_, value) => handleInputChange('work_experience', value || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  label="Experiencia Laboral"
                  onChange={(e) => handleInputChange('work_experience', e.target.value)}
                />
              )}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2 }}
            >
              Subir CV (PDF/DOCX)
              <input
                type="file"
                hidden
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </Button>
            {file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Archivo seleccionado: {file.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => setFormData(initialFormData)}>Limpiar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default CandidateForm;