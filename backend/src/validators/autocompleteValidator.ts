import { query } from 'express-validator';

export const validateAutocomplete = [
  query('field')
    .isIn(['education', 'work_experience'])
    .withMessage('Campo inválido. Use "education" o "work_experience"'),
  query('search')
    .isString()
    .isLength({ min: 5 })
    .withMessage('El término de búsqueda debe tener al menos 5 caracteres'),
];