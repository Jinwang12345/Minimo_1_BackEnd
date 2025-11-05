### EA-Minimo_1

ENTREGA - MINIMO_1 - SISTEMA DE COMENTARIOS

INFORMACIÓN DEL EJERCICIO:
- Número de enunciado: Gestor de Comentarios
- Descripción: Sistema de comentarios donde los usuarios pueden comentar en eventos


 REQUISITOS CUMPLIDOS


 BASE DE DATOS (MongoDB):
1.  Nueva colección: "Comentario"
2.  Relaciones:
   - usuario → Usuario (ObjectId ref)
   - evento → Evento (ObjectId ref)
3.  3 tipos de datos diferentes:
   - String: contenido (texto del comentario)
   - Date: fechaCreacion (fecha y hora de creación)
   - Number: likes (cantidad de likes, mínimo 0)

 BACKEND (Node.js + Express + TypeScript):
1.  Nuevo modelo: comentario.ts (src/models/)
2.  Nuevo endpoint: /api/comment
3.  Operaciones CRUD completas:
   - POST /api/comment → Crear comentario
   - GET /api/comment → Listar todos (paginado)
   - GET /api/comment/:id → Obtener por ID
   - PUT /api/comment/:id → Actualizar comentario
   - DELETE /api/comment/:id → Eliminar comentario
4.  Funcionalidades adicionales:
   - GET /api/comment/evento/:eventoId → Filtrar por evento (paginado)
   - GET /api/comment/search?q=texto → Buscador (paginado)
   - PUT /api/comment/:id/like → Dar like
5.  Listado paginado implementado (parámetros: page, limit)
6.  Buscador funcional (por contenido del comentario)

 FRONTEND (Angular):
1.  Nuevo modelo: comentario.model.ts (src/app/models/)
2.  Nuevo servicio: comentario.service.ts (src/app/services/)
3.  Nuevo componente: ComentariosComponent (src/app/components/comentarios/)
4.  Uso completo de endpoints:
   - createComentario() → POST crear
   - getAllComentarios() → GET listar con paginación
   - getComentarioById() → GET por ID
   - getComentariosByEvento() → GET filtrar por evento
   - searchComentarios() → GET buscar
   - updateComentario() → PUT actualizar
   - deleteComentario() → DELETE eliminar
   - likeComentario() → PUT dar like


 FUNCIONALIDADES IMPLEMENTADAS


BACKEND:
-  Modelo de datos con validaciones (minlength, maxlength, required)
-  Service con lógica de negocio separada
-  Controller con manejo de errores robusto
-  Rutas con documentación Swagger completa
-  Paginación en todos los listados
-  Populate de relaciones (usuario y evento)
-  Búsqueda por texto con regex
-  Filtrado por evento
-  Sistema de likes incrementales

FRONTEND:
-  Formulario reactivo para crear/editar comentarios
-  Visualización en cards con diseño moderno
-  Paginación funcional (anterior/siguiente)
-  Selector de cantidad por página (5, 10, 20)
-  Buscador en tiempo real
-  Filtro por evento (dropdown)
-  Sistema de likes con botón interactivo
-  Edición inline con precarga de datos
-  Modal de confirmación para eliminar
-  Mensajes de error y validaciones
-  Diseño responsive y accesible
-  Integración con home (navegación)


 ENDPOINTS API


Base URL: http://localhost:3000/api/comment

CREATE:
- POST / → Crear comentario
  Body: { contenido, usuario, evento, likes? }

READ:
- GET / → Listar todos (paginado)
  Query: ?page=1&limit=10
- GET /:id → Obtener por ID
- GET /evento/:eventoId → Filtrar por evento
  Query: ?page=1&limit=10
- GET /search → Buscar por texto
  Query: ?q=texto&page=1&limit=10

UPDATE:
- PUT /:id → Actualizar comentario
  Body: { contenido?, likes? }
- PUT /:id/like → Incrementar likes

DELETE:
- DELETE /:id → Eliminar comentario


 DECISIONES DE DISEÑO Y COMENTARIOS IMPORTANTES


1. MODELO DE DATOS:
   - Se utilizó ObjectId para las relaciones con Usuario y Evento
   - El campo 'likes' permite incremento y tiene validación mínima de 0
   - La fecha de creación se establece automáticamente al crear
   - Máximo 500 caracteres para el contenido del comentario

2. PAGINACIÓN:
   - Implementada en todos los listados para optimizar rendimiento
   - Parámetros configurables: page (número) y limit (cantidad)
   - Respuesta incluye: comentarios[], total, page, totalPages

3. BÚSQUEDA:
   - Búsqueda insensible a mayúsculas/minúsculas (regex con flag 'i')
   - Búsqueda en el campo 'contenido'
   - También paginada para grandes volúmenes de datos

4. POPULATE:
   - Todos los endpoints que devuelven comentarios populan usuario y evento
   - Solo se devuelven campos específicos: username, gmail (usuario) y name, schedule (evento)

5. VALIDACIONES:
   - Backend: validación de ObjectId antes de consultas
   - Frontend: validaciones en formulario (campos requeridos, máximo caracteres)
   - Manejo de errores consistente en toda la aplicación

6. INTERFAZ:
   - Diseño moderno con cards para cada comentario
   - Avatar generado con inicial del nombre de usuario
   - Likes con botón interactivo y contador visible
   - Filtros y búsqueda en la misma vista
   - Modal de confirmación para acciones destructivas

### Sources:
  - Code autogeneration  using GitHub Copilot, CHATGPT, CLAUDE.

