import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import path from 'path'; // Añadir esta importación
import prisma from '../index';

export const createCandidate = async (req: Request, res: Response) => {
  try {
    // Validar campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: 400,
        message: 'Error de validación',
        payload: { errors: errors.array() }
      });
    }

    // Preparar datos del candidato
    const candidateData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      education: req.body.education,
      work_experience: req.body.work_experience,
      resume_file: req.file ? req.file.buffer : null,
      resume_file_type: req.file ? path.extname(req.file.originalname).substring(1) : null
    };

    // Crear candidato
    const candidate = await prisma.candidate.create({
      data: candidateData
    });

    // Estructurar respuesta
    const responsePayload = {
      id: candidate.id,
      name: `${candidate.first_name} ${candidate.last_name}`,
      email: candidate.email,
      phone: candidate.phone,
      address: candidate.address,
      education: candidate.education,
      work_experience: candidate.work_experience,
      created_at: candidate.created_at,
      updated_at: candidate.updated_at
    };

    return res.status(201).json({
      code: 201,
      message: 'Candidato creado exitosamente',
      payload: responsePayload
    });

  } catch (error) {
    console.error('Error al crear candidato:', error);
    return res.status(500).json({
      code: 500,
      message: 'Error interno del servidor',
      payload: { error: error instanceof Error ? error.message : 'Unknown error' }
    });
  }
};