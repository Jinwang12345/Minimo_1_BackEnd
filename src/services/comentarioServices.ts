import { Comentario, IComentario } from '../models/comentario';
import { Types } from 'mongoose';

export class ComentarioService {
  // Crear comentario
  async createComentario(data: Partial<IComentario>): Promise<IComentario> {
    const comentario = new Comentario(data);
    return await comentario.save();
  }

  // Obtener todos los comentarios con paginación y populate
  async getAllComentarios(page: number = 1, limit: number = 10): Promise<{
    comentarios: IComentario[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const total = await Comentario.countDocuments();
    const comentarios = await Comentario.find()
      .populate('usuario', 'username gmail')
      .populate('evento', 'name schedule')
      .sort({ fechaCreacion: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      comentarios,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  // Obtener comentario por ID
  async getComentarioById(id: string): Promise<IComentario | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID inválido');
    }
    return await Comentario.findById(id)
      .populate('usuario', 'username gmail')
      .populate('evento', 'name schedule')
      .exec();
  }

  // Obtener comentarios por evento (con paginación)
  async getComentariosByEvento(
    eventoId: string, 
    page: number = 1, 
    limit: number = 10
  ): Promise<{
    comentarios: IComentario[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    if (!Types.ObjectId.isValid(eventoId)) {
      throw new Error('ID de evento inválido');
    }

    const skip = (page - 1) * limit;
    const total = await Comentario.countDocuments({ evento: eventoId });
    const comentarios = await Comentario.find({ evento: eventoId })
      .populate('usuario', 'username gmail')
      .populate('evento', 'name schedule')
      .sort({ fechaCreacion: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      comentarios,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  // Buscar comentarios por contenido (buscador)
  async searchComentarios(
    query: string, 
    page: number = 1, 
    limit: number = 10
  ): Promise<{
    comentarios: IComentario[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const searchRegex = new RegExp(query, 'i');
    
    const total = await Comentario.countDocuments({ 
      contenido: searchRegex 
    });

    const comentarios = await Comentario.find({ 
      contenido: searchRegex 
    })
      .populate('usuario', 'username gmail')
      .populate('evento', 'name schedule')
      .sort({ fechaCreacion: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      comentarios,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  // Actualizar comentario
  async updateComentario(id: string, data: Partial<IComentario>): Promise<IComentario | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID inválido');
    }
    return await Comentario.findByIdAndUpdate(id, data, { new: true })
      .populate('usuario', 'username gmail')
      .populate('evento', 'name schedule')
      .exec();
  }

  // Dar like a un comentario
  async likeComentario(id: string): Promise<IComentario | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID inválido');
    }
    return await Comentario.findByIdAndUpdate(
      id, 
      { $inc: { likes: 1 } }, 
      { new: true }
    )
      .populate('usuario', 'username gmail')
      .populate('evento', 'name schedule')
      .exec();
  }

  // Eliminar comentario
  async deleteComentario(id: string): Promise<IComentario | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID inválido');
    }
    return await Comentario.findByIdAndDelete(id).exec();
  }
}