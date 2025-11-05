import { Router } from 'express';
import {
  createComentario,
  getAllComentarios,
  getComentarioById,
  getComentariosByEvento,
  searchComentarios,
  updateComentario,
  likeComentario,
  deleteComentario
} from '../controller/comentarioController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       required:
 *         - contenido
 *         - usuario
 *         - evento
 *       properties:
 *         _id:
 *           type: string
 *           description: ID generado por MongoDB
 *         contenido:
 *           type: string
 *           description: Texto del comentario
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del comentario
 *         usuario:
 *           type: string
 *           description: ID del usuario que comentó
 *         evento:
 *           type: string
 *           description: ID del evento comentado
 *         likes:
 *           type: number
 *           description: Cantidad de likes del comentario
 *       example:
 *         contenido: "¡Excelente evento! Muy recomendable"
 *         usuario: "507f1f77bcf86cd799439011"
 *         evento: "507f191e810c19729de860ea"
 *         likes: 5
 */

/**
 * @swagger
 * /api/comentario:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *       400:
 *         description: Error en los datos del comentario
 */
router.post('/', createComentario);

/**
 * @swagger
 * /api/comentario:
 *   get:
 *     summary: Obtener todos los comentarios (paginado)
 *     tags: [Comentarios]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comentarios:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comentario'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
router.get('/', getAllComentarios);

/**
 * @swagger
 * /api/comentario/search:
 *   get:
 *     summary: Buscar comentarios por contenido
 *     tags: [Comentarios]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Texto a buscar en los comentarios
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *       400:
 *         description: Parámetro de búsqueda faltante
 */
router.get('/search', searchComentarios);

/**
 * @swagger
 * /api/comentario/evento/{eventoId}:
 *   get:
 *     summary: Obtener comentarios de un evento específico
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Comentarios del evento
 *       404:
 *         description: Evento no encontrado
 */
router.get('/evento/:eventoId', getComentariosByEvento);

/**
 * @swagger
 * /api/comentario/{id}:
 *   get:
 *     summary: Obtener un comentario por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *       404:
 *         description: Comentario no encontrado
 */
router.get('/:id', getComentarioById);

/**
 * @swagger
 * /api/comentario/{id}:
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *               likes:
 *                 type: number
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 *       404:
 *         description: Comentario no encontrado
 */
router.put('/:id', updateComentario);

/**
 * @swagger
 * /api/comentario/{id}/like:
 *   put:
 *     summary: Dar like a un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Like agregado exitosamente
 *       404:
 *         description: Comentario no encontrado
 */
router.put('/:id/like', likeComentario);

/**
 * @swagger
 * /api/comentario/{id}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       404:
 *         description: Comentario no encontrado
 */
router.delete('/:id', deleteComentario);

export default router;