import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../index';

export const getAutocomplete = async (req: Request, res: Response) => {
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

    const field = req.query.field as string;
    const search = req.query.search as string;

    // Construir la consulta dinámica
    const where = {
      [field]: {
        contains: search,
        mode: 'insensitive'
      }
    };

    // Realizar la búsqueda
    const results = await prisma.candidate.findMany({
      where,
      select: {
        [field]: true
      },
      distinct: [field],
      take: 10
    });

    // Si no hay resultados
    if (results.length === 0) {
      return res.status(404).json({
        code: 404,
        message: 'No se encontraron resultados',
        payload: { [field]: [] }
      });
    }

    // Extraer valores únicos
    const suggestions = [...new Set(results.map(r => r[field]))].filter(Boolean);

    return res.status(200).json({
      code: 200,
      message: 'Sugerencias encontradas',
      payload: { [field]: suggestions }
    });

  } catch (error) {
    console.error('Error en autocompletado:', error);
    return res.status(404).json({
      code: 404,
      message: 'Error al buscar sugerencias',
      payload: { error: error instanceof Error ? error.message : 'Unknown error' }
    });
  }
};