# Prompts Iniciales del Proyecto

## 1. Configuración Inicial
```markdown
Dame los comandos más importantes para poder ejecutar este proyecto.

Eres un experto en PostgreSQL y en Prompt Engineer. Crea un prompt que me permita crear una tabla que servirá para guardar candidatos con los siguientes requerimientos:
1. Tiene los siguientes campos: nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral, resumen CV
2. Los campos obligatorios seran los siguientes: nombre, apellido, correo electronico, telefono, dirección
3. El campo resumen CV albergará archivos PDF o DOCX
4. Los campos de la tabla serán en ingles

¿Cómo verifico que he creado mi tabla correctamente?

Eres un experto en NodeJS, Express y Prisma. Genera un endpoint para crear candidatos con los siguientes requerimientos:
1. Guarda un candidato en la tabla "Candidate"
2. Cada campo es validado antes de crear el candidato en base de datos
3. Manda un error si no se incluye un campo obligatorio o si contiene un valor invalido
4. Si la validación falla manda un error con todos los campos que contiene error
5. El endpoint acepta archivos tipo PDF y DOCX para el campo "resume_file"
6. La respuesta es una respuesta JSON con estructura específica
7. Si todos los campos son validos crea un registro en la tabla
8. Cuando se guarde exitosamente el registro manda una respuesta de exito

Eres un experto en React. Genera un botón que abra un formulario con los siguientes requerimientos:
1. El formulario tiene campos específicos
2. Tiene un campo para subir archivos PDF/DOCX
3. Validaciones en cada campo
4. Muestra errores de validación
5. Botones de guardar y limpiar
6. Integración con backend
7. Autocompletado en campos específicos
8. Mensajes de confirmación/error
9. Diseño responsivo

[Varios reportes de errores y sus soluciones]
- Error de TypeScript con debounce
- Error CORS en peticiones al backend
- Errores de ejecución de comandos en Windows

Enlista todas las validaciones de campos existentes, separalas por Backend y Frontend


3. Verifica que el archivo se haya creado correctamente:
```bash
dir prompts-iniciales.md

Comentario del autor: El historico completo de prompts, resultados e iteraciones lo podemos ver en full-AI-log.md

