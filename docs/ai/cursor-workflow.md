# Flujo de trabajo con Cursor

## ¿Qué voy a documentar aquí?

En este documento explico cómo he usado Cursor como IDE asistido por IA para trabajar en el proyecto TaskFlow. Incluyo atajos de teclado, ejemplos concretos de mejoras y mi experiencia general.

---

## ¿Qué es Cursor?

Cursor es un editor de código basado en VS Code que integra IA directamente en el flujo de trabajo. A diferencia de usar ChatGPT en el navegador, Cursor tiene acceso directo a todos tus archivos y puede modificarlos directamente.

---

## Instalación

1. Descargué Cursor desde **cursor.sh**
2. Lo instalé como cualquier programa de Windows
3. Abrí la carpeta `taskflow` desde `Archivo → Abrir carpeta`
4. Cursor detectó automáticamente los archivos del proyecto

---

## Atajos de teclado más usados

| Atajo | Qué hace |
|---|---|
| `Ctrl + K` | Edición inline — modificar código seleccionado con IA |
| `Ctrl + L` | Abrir el chat lateral con contexto del proyecto |
| `Ctrl + Shift + P` | Paleta de comandos |
| `Tab` | Aceptar sugerencia de autocompletado |
| `Ctrl + Z` | Deshacer cambio sugerido por IA |
| `Ctrl + Enter` | Confirmar cambio en edición inline |

---

## Ejemplo 1: Autocompletado inteligente

Escribí este comentario en `app.js`:

```javascript
// Función que recibe un array de tareas y devuelve solo las completadas
```

Cursor sugirió automáticamente:

```javascript
function getCompletedTasks(tasks) {
  return tasks.filter(task => task.completed === true);
}
```

La sugerencia fue correcta y la acepté con `Tab`. Me ahorró escribir la función manualmente.

---

## Ejemplo 2: Explicación de código existente

Seleccioné la función `render()` en `app.js` y usé `Ctrl + L` para preguntar:

> "¿Qué hace exactamente esta función y por qué se llama cada vez que cambia algo?"

Cursor respondió explicando que `render()` es el punto central que actualiza toda la interfaz — estadísticas, lista de tareas y barra de progreso — cada vez que el estado cambia. Me ayudó a entender por qué en este proyecto no se usa un framework como React: `render()` hace el trabajo de forma manual.

---

## Ejemplo 3: Refactorización con edición inline

Seleccioné esta función:

```javascript
function fmtDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
  });
}
```

Usé `Ctrl + K` y escribí:
> "Añade JSDoc a esta función"

Cursor generó:

```javascript
/**
 * Formatea un timestamp en una fecha legible en español.
 * @param {number} ts - Timestamp en milisegundos
 * @returns {string} Fecha formateada (ej: "15 abr")
 */
function fmtDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
  });
}
```

Lo acepté directamente porque era correcto.

---

## Ejemplo 4: Composer para cambios en varios archivos

Usé Composer (`Ctrl + Shift + I`) para pedir:
> "Añade un atributo aria-label a todos los botones del index.html que no lo tengan"

Cursor revisó el archivo y añadió los atributos que faltaban automáticamente, sin que yo tuviera que buscarlos uno por uno.

---

## Conclusión

Cursor es muy útil para:
- Autocompletar código rutinario rápidamente
- Entender código que no conoces bien
- Añadir documentación JSDoc sin escribirla manualmente
- Hacer cambios en varios archivos a la vez con Composer

Lo que no reemplaza:
- Tu criterio para decidir si el código generado es correcto
- Entender el código antes de aceptarlo
- La lógica de diseño de la aplicación
