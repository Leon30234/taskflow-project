<<<<<<< HEAD
# TaskFlow

Aplicación de gestión de tareas construida con HTML, CSS y JavaScript puro.

## Demo

> Añade aquí la URL de Vercel cuando la publiques

## Funcionalidades

- Añadir, editar, completar y eliminar tareas
- Prioridades por tarea: alta, media y baja
- Filtros: todas / pendientes / completadas
- Búsqueda por texto en tiempo real
- Completar todas las tareas de un clic
- Borrar tareas completadas
- Barra de progreso con porcentaje
- Persistencia de datos con LocalStorage
- Modo oscuro con preferencia guardada
- Diseño responsive (móvil y escritorio)
- Animaciones al crear y eliminar tareas
- Accesibilidad: navegación por teclado y aria-labels

## Estructura del proyecto

```
taskflow/
├── index.html   → Estructura HTML semántica
├── style.css    → Estilos y variables CSS, responsive
├── app.js       → Lógica JavaScript completa
├── .gitignore
└── README.md
```

## Cómo ejecutar localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/bootcamp-project.git
   cd bootcamp-project
   ```
2. Abre `index.html` con la extensión **Live Server** de VS Code, o simplemente haz doble clic en el archivo.

## Pruebas manuales realizadas

| Caso | Resultado |
|------|-----------|
| App con lista vacía | Muestra mensaje "Añade la primera tarea" |
| Añadir tarea sin título | No se añade, input permanece enfocado |
| Título muy largo (120 car.) | Se muestra correctamente con word-break |
| Marcar tareas completadas | Tachado visual y estadísticas actualizadas |
| Eliminar tareas | Animación de salida, lista actualizada |
| Recargar página | Datos persisten correctamente en LocalStorage |
| Filtro "Pendientes" | Solo muestra tareas sin completar |
| Filtro "Completadas" | Solo muestra tareas completadas |
| Búsqueda por texto | Filtra en tiempo real |
| Modo oscuro | Se activa y recuerda la preferencia |
| Navegación por teclado | Tab, Enter y Espacio funcionan correctamente |

## Despliegue

El proyecto está desplegado en Vercel con despliegue automático desde la rama `main`.
=======
# taskflow-project
>>>>>>> 47695e6aabd7b948190676019b2da9562f64bda4
