# Backend API — Herramientas del ecosistema

## Axios
Librería JavaScript para hacer peticiones HTTP más cómodas que fetch.
- Convierte respuestas a JSON automáticamente
- Lanza errores automáticamente en respuestas 4xx y 5xx
- Permite interceptores para añadir cabeceras a todas las peticiones

## Postman
Aplicación para probar APIs visualmente sin escribir código.
- Probar endpoints antes de conectar el frontend
- Forzar errores intencionados (POST sin título, DELETE de ID inexistente)
- Guardar colecciones de pruebas para compartir con el equipo

## Sentry
Herramienta de monitorización de errores en producción.
- Captura errores en tiempo real cuando la app falla
- Muestra el error completo, el usuario afectado y el contexto
- Envía alertas por email cuando algo falla en producción

## Swagger
Herramienta para documentar APIs REST de forma interactiva.
- Genera una página web donde se pueden ver y probar todos los endpoints
- Estándar de la industria para documentar APIs
- Evita malentendidos entre equipos de frontend y backend