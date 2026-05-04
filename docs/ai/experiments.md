# Experimentos con IA en programación

## ¿Qué voy a documentar aquí?

En este documento comparo resolver problemas de programación con y sin IA, midiendo el tiempo invertido, la calidad del resultado y mi comprensión del problema.

---

## Metodología

Para cada experimento:
1. Intento resolver el problema solo, sin IA
2. Lo resuelvo con ayuda de IA
3. Comparo los resultados

---

## Experimento 1: Función de filtrado

### Problema
Crear una función que filtre un array de tareas según su estado (todas, pendientes, completadas) y un texto de búsqueda al mismo tiempo.

### Sin IA
**Tiempo:** ~20 minutos

**Mi solución:**
```javascript
function filtrar(tareas, filtro, busqueda) {
  let resultado = [];
  for (let i = 0; i < tareas.length; i++) {
    let tarea = tareas[i];
    let pasaFiltro = false;
    if (filtro === 'all') pasaFiltro = true;
    if (filtro === 'done' && tarea.completed) pasaFiltro = true;
    if (filtro === 'pending' && !tarea.completed) pasaFiltro = true;
    if (pasaFiltro && tarea.title.includes(busqueda)) {
      resultado.push(tarea);
    }
  }
  return resultado;
}
```

**Problemas que encontré:** No tuve en cuenta mayúsculas/minúsculas en la búsqueda.

### Con IA
**Tiempo:** ~3 minutos

**Solución generada:**
```javascript
function getFiltered(tasks, filter, searchQ) {
  return tasks.filter(task => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'done'    &&  task.completed) ||
      (filter === 'pending' && !task.completed);

    const matchSearch =
      !searchQ ||
      task.title.toLowerCase().includes(searchQ.toLowerCase());

    return matchFilter && matchSearch;
  });
}
```

### Comparativa

| | Sin IA | Con IA |
|---|---|---|
| Tiempo | 20 min | 3 min |
| Calidad | Funciona pero verbosa | Concisa y correcta |
| Bug de mayúsculas | ❌ No lo consideré | ✅ Lo maneja |
| Comprensión | Alta | Alta (revisé el código) |

**Conclusión:** La IA fue mucho más rápida y generó código más limpio. Sin embargo, al revisar el código entendí por qué usa `.toLowerCase()` y aprendí a usar `.filter()` encadenado.

---

## Experimento 2: Generador de IDs únicos

### Problema
Generar un ID único para cada tarea sin usar librerías externas.

### Sin IA
**Tiempo:** ~10 minutos

**Mi solución:**
```javascript
function generarId() {
  return Math.random().toString().slice(2);
}
```

**Problema:** Muy corto y podría haber colisiones con muchas tareas.

### Con IA
**Tiempo:** ~1 minuto

**Solución generada:**
```javascript
function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
```

### Comparativa

| | Sin IA | Con IA |
|---|---|---|
| Tiempo | 10 min | 1 min |
| Riesgo de colisión | Alto | Muy bajo |
| Comprensión | Alta | Media (tuve que investigar toString(36)) |

**Conclusión:** La solución de la IA es mejor técnicamente. Tuve que buscar qué significa `toString(36)` (convierte a base 36 usando letras y números) para entenderla del todo.

---

## Experimento 3: Animación de entrada y salida

### Problema
Hacer que las tareas aparezcan y desaparezcan con animación suave.

### Sin IA
**Tiempo:** ~30 minutos

Intenté usar `setTimeout` para eliminar el elemento después de una animación CSS, pero no lo sincronicé bien y el elemento desaparecía antes de que terminara la animación.

**Mi código (con bug):**
```javascript
function removeTask(id) {
  const el = document.querySelector(`[data-id="${id}"]`);
  el.style.opacity = '0';
  tasks = tasks.filter(t => t.id !== id);
  render(); // esto borraba el elemento antes de la animación
}
```

### Con IA
**Tiempo:** ~5 minutos

**Solución generada:**
```javascript
function removeTask(id, el) {
  el.classList.add('removing'); // añade clase con animación CSS
  setTimeout(() => {            // espera a que termine la animación
    tasks = tasks.filter(t => t.id !== id);
    render();
  }, 180); // mismo tiempo que dura la animación en CSS
}
```

### Comparativa

| | Sin IA | Con IA |
|---|---|---|
| Tiempo | 30 min | 5 min |
| Resultado | Bug — animación rota | Funciona perfectamente |
| Comprensión | Baja al principio | Alta tras revisar |

**Conclusión:** Este fue el caso donde la IA me ahorró más frustración. El patrón de "añadir clase + setTimeout sincronizado con CSS" no lo conocía y la IA me lo enseñó.

---

## Experimento 4: Modo oscuro con LocalStorage

### Problema
Guardar la preferencia de modo oscuro del usuario para que se recuerde al recargar.

### Sin IA
**Tiempo:** ~15 minutos

Sabía que tenía que usar `localStorage` pero no recordaba la sintaxis exacta ni cómo aplicar la clase al cargar la página.

### Con IA
**Tiempo:** ~2 minutos

```javascript
function setDark(on, persist = true) {
  document.body.classList.toggle('dark', on);
  document.getElementById('btn-dark').textContent = on ? '☀️' : '🌙';
  if (persist) localStorage.setItem('taskflow_dark', on ? '1' : '0');
}

// Al cargar la página:
if (localStorage.getItem('taskflow_dark') === '1') setDark(true, false);
```

**Aprendizaje clave:** El parámetro `persist = true` por defecto es un patrón muy útil para controlar cuándo guardar y cuándo no.

---

## Conclusión general

| Experimento | Tiempo sin IA | Tiempo con IA | ¿Aprendí más sin IA? |
|---|---|---|---|
| Filtrado | 20 min | 3 min | No — la IA me enseñó `.toLowerCase()` |
| IDs únicos | 10 min | 1 min | Sí — investigué `toString(36)` por mi cuenta |
| Animaciones | 30 min | 5 min | No — la IA me enseñó el patrón correcto |
| Modo oscuro | 15 min | 2 min | No — me recordó la sintaxis de localStorage |

**Reflexión final:** La IA es mucho más rápida en todos los casos. Sin embargo, aprender sin IA primero me obliga a pensar más profundamente en el problema, lo que a veces genera mejor comprensión aunque el resultado sea peor técnicamente. Lo ideal es intentarlo primero solo y luego usar la IA para mejorar o desbloquearme cuando me atasco.
