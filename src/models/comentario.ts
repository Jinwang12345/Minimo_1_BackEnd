import { Schema, model, Types } from 'mongoose';

export interface IComentario {
  _id: Types.ObjectId;
  contenido: string;
  fechaCreacion: Date;
  usuario: Types.ObjectId;  // Relación con Usuario
  evento: Types.ObjectId;   // Relación con Evento
  likes: number;            // Tercer tipo de dato (número)
}

const comentarioSchema = new Schema<IComentario>({
  contenido: { type: String, required: true, minlength: 1, maxlength: 500 },
  fechaCreacion: { type: Date, default: Date.now, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  evento: { type: Schema.Types.ObjectId, ref: 'Evento', required: true },
  likes: { type: Number, default: 0, min: 0 }
}, { 
  timestamps: false, 
  versionKey: false 
});

export const Comentario = model<IComentario>('Comentario', comentarioSchema);
export default Comentario;