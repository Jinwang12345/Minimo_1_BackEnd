import { Request, Response } from 'express';
import { ComentarioService } from '../services/comentarioServices';
import { IComentario } from '../models/comentario';

const comentarioService = new ComentarioService();

// CREATE - Crear comentario
export async function createComentario(req: Request, res: Response): Promise<Response> {
  try {
    const { contenido, usuario, evento, likes } = req.body;

    if (!contenido || !usuario || !evento) {
      return res.status(400).json({ 
        message: 'Faltan campos obligatorios: contenido, usuario y evento' 
      });
    }

    const nuevoComentario: Partial<IComentario> = {
      contenido,
      usuario,
      evento,
      likes: likes || 0,
      fechaCreacion: new Date()
    };

    const comentario = await comentarioService.createComentario(nuevoComentario);
    
    return res.status(201).json({
      message: 'Comentario creado exitosamente',
      comentario
    });
  } catch (error) {
    return res.status(400).json({ 
      message: (error as Error).message 
    });
  }
}

// READ - Obtener todos los comentarios (con paginación)
export async function getAllComentarios(req: Request, res: Response): Promise<Response> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await comentarioService.getAllComentarios(page, limit);
    
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ 
      message: (error as Error).message 
    });
  }
}

// READ - Obtener comentario por ID
export async function getComentarioById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const comentario = await comentarioService.getComentarioById(id);
    
    if (!comentario) {
      return res.status(404).json({ 
        message: 'COMENTARIO NO ENCONTRADO' 
      });
    }
    
    return res.status(200).json(comentario);
  } catch (error) {
    return res.status(400).json({ 
      message: (error as Error).message 
    });
  }
}

// READ - Obtener comentarios por evento
export async function getComentariosByEvento(req: Request, res: Response): Promise<Response> {
  try {
    const { eventoId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await comentarioService.getComentariosByEvento(eventoId, page, limit);
    
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ 
      message: (error as Error).message 
    });
  }
}

// READ - Buscar comentarios (buscador)
export async function searchComentarios(req: Request, res: Response): Promise<Response> {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ 
        message: 'Se requiere un parámetro de búsqueda "q"' 
      });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await comentarioService.searchComentarios(q, page, limit);
    
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ 
      message: (error as Error).message 
    });
  }
}

// UPDATE - Actualizar comentario
export async function updateComentario(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { contenido, likes } = req.body;

    const dataToUpdate: Partial<IComentario> = {};
    if (contenido !== undefined) dataToUpdate.contenido = contenido;
    if (likes !== undefined) dataToUpdate.likes = likes;

    const comentarioActualizado = await comentarioService.updateComentario(id, dataToUpdate);
    
    if (!comentarioActualizado) {
      return res.status(404).json({ 
        message: 'COMENTARIO NO ENCONTRADO' 
      });
    }
    
    return res.status(200).json({
      message: 'Comentario actualizado exitosamente',
      comentario: comentarioActualizado
    });
  } catch (error) {
    return res.status(400).json({ 
      message: (error as Error).message 
    });
  }
}

// UPDATE - Dar like a un comentario
export async function likeComentario(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const comentario = await comentarioService.likeComentario(id);
    
    if (!comentario) {
      return res.status(404).json({ 
        message: 'COMENTARIO NO ENCONTRADO' 
      });
    }
    
    return res.status(200).json({
      message: 'Like agregado exitosamente',
      comentario
    });
  } catch (error) {
    return res.status(400).json({ 
      message: (error as Error).message 
    });
  }
}

// DELETE - Eliminar comentario
export async function deleteComentario(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const comentario = await comentarioService.deleteComentario(id);
    
    if (!comentario) {
      return res.status(404).json({ 
        message: 'COMENTARIO NO ENCONTRADO' 
      });
    }
    
    return res.status(200).json({
      message: 'Comentario eliminado exitosamente',
      comentario
    });
  } catch (error) {
    return res.status(400).json({ 
      message: (error as Error).message 
    });
  }
}