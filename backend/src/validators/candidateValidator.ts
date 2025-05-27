import { body } from 'express-validator';

export const validateCandidate = [
  body('first_name')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser texto'),
  body('last_name')
    .notEmpty().withMessage('El apellido es requerido')
    .isString().withMessage('El apellido debe ser texto'),
  body('email')
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Email inválido'),
  body('phone')
    .notEmpty().withMessage('El teléfono es requerido')
    .matches(/^\+?[\d\s-]+$/).withMessage('Teléfono inválido'),
  body('address')
    .notEmpty().withMessage('La dirección es requerida')
    .isString().withMessage('La dirección debe ser texto'),
  body('education')
    .optional()
    .isString().withMessage('La educación debe ser texto'),
  body('work_experience')
    .optional()
    .isString().withMessage('La experiencia laboral debe ser texto'),
];