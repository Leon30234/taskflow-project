# Prompt Engineering aplicado al desarrollo

## ¿Qué voy a documentar aquí?

En este documento guardo los prompts más útiles que he usado durante el desarrollo de TaskFlow, explicando por qué funcionan bien y qué técnica aplican.

---

## ¿Qué es el prompt engineering?

Es la técnica de escribir instrucciones para la IA de forma que obtengas respuestas más útiles, precisas y completas. Un buen prompt marca la diferencia entre una respuesta genérica y una solución exacta a tu problema.

---

## Técnicas principales

### 1. Definir un rol
Le dices a la IA quién debe ser antes de responder.

### 2. Few-shot prompting
Das ejemplos de lo que esperas antes de hacer la pregunta real.

### 3. Razonamiento paso a paso
Le pides que piense antes de responder.

### 4. Restricciones claras
Le dices exactamente qué formato o límites debe respetar.

---

## Los 10 prompts más útiles

---

### Prompt 1 — Rol de desarrollador senior

**Técnica:** Definir rol

**Prompt:**
> "Actúa como un desarrollador senior de JavaScript con 10 años de experiencia. Revisa esta función y dime qué mejorarías, explicando el motivo de cada cambio:
> [pegar función]"

**Por qué funciona:**
Al definir un rol experto, la IA tiende a dar respuestas más detalladas, con justificaciones técnicas y buenas prácticas, en lugar de una respuesta básica.

---

### Prompt 2 — Explicación para principiantes

**Técnica:** Definir audiencia

**Prompt:**
> "Explícame qué es el event loop de JavaScript como si tuviera 16 años y nunca hubiera programado. Usa una analogía de la vida real."

**Por qué funciona:**
Definir el nivel de conocimiento del receptor obliga a la IA a simplificar y usar ejemplos concretos en lugar de jerga técnica.

---

### Prompt 3 — Generación de código con restricciones

**Técnica:** Restricciones claras

**Prompt:**
> "Escribe una función JavaScript que filtre un array de tareas. Requisitos:
> - Debe aceptar dos parámetros: el array y el filtro ('all', 'pending', 'done')
> - No uses librerías externas
> - Añade comentarios explicando cada línea
> - Devuelve siempre un array aunque esté vacío"

**Por qué funciona:**
Las restricciones específicas evitan que la IA tome atajos o use soluciones que no encajan con tu proyecto.

---
### Prompt 4 — Detección de bugs paso a paso

**Técnica:** Razonamiento paso a paso

**Prompt:**
> "Analiza este código paso a paso, línea por línea, e identifica todos los posibles errores o problemas. Para cada problema explica: qué es, por qué ocurre y cómo corregirlo:
> [pegar código]"

**Por qué funciona:**
Pedir análisis línea por línea evita que la IA solo detecte el error más obvio e ignore otros problemas más sutiles.

---

### Prompt 5 — Few-shot para generar JSDoc

**Técnica:** Few-shot prompting

**Prompt:**
> "Añade comentarios JSDoc a estas funciones siguiendo este ejemplo:
>
> Ejemplo de entrada:
> function sumar(a, b) { return a + b; }
>
> Ejemplo de salida:
> /**
>  * Suma dos números.
>  * @param {number} a - Primer número
>  * @param {number} b - Segundo número
>  * @returns {number} La suma de a y b
>  */
> function sumar(a, b) { return a + b; }
>
> Ahora haz lo mismo con estas funciones:
> [pegar funciones]"

**Por qué funciona:**
Dar un ejemplo exacto del formato que esperas garantiza que la IA siga ese estilo en todas las respuestas.

---

### Prompt 6 — Refactorizar sin cambiar funcionalidad

**Técnica:** Restricciones claras + rol

**Prompt:**
> "Actúa como un revisor de código. Refactoriza esta función para que sea más legible y eficiente, pero sin cambiar su comportamiento. No añadas funcionalidades nuevas. Explica cada cambio que hagas:
> [pegar función]"

**Por qué funciona:**
La restricción "sin cambiar comportamiento" evita que la IA modifique la lógica y rompa algo que ya funciona.

---

### Prompt 7 — Generar casos de prueba

**Técnica:** Rol + restricciones

**Prompt:**
> "Actúa como un tester de software. Para esta función, genera una lista de casos de prueba que cubran: el caso normal, casos límite y casos de error. Para cada caso indica la entrada, la salida esperada y por qué es importante probarlo:
> [pegar función]"

**Por qué funciona:**
Definir los tres tipos de casos (normal, límite, error) garantiza una cobertura completa que de otro modo la IA podría omitir.

---

### Prompt 8 — Explicar código ajeno

**Técnica:** Razonamiento paso a paso

**Prompt:**
> "Explícame qué hace este código paso a paso, como si me lo estuvieras explicando en voz alta mientras lo lees. Luego dime en una sola frase qué problema resuelve:
> [pegar código]"

**Por qué funciona:**
Pedir la explicación "en voz alta" obliga a la IA a ser más detallada y secuencial, en lugar de dar un resumen vago.

---

### Prompt 9 — Mejorar nombres de variables

**Técnica:** Restricciones claras

**Prompt:**
> "Revisa este código y propón nombres más descriptivos para todas las variables y funciones que tengan nombres poco claros (como 'x', 'data', 'temp', 'fn'). Para cada cambio explica por qué el nuevo nombre es mejor:
> [pegar código]"

**Por qué funciona:**
Los buenos nombres de variables son clave para el mantenimiento del código. Este prompt fuerza a la IA a justificar cada cambio.

---

### Prompt 10 — Generar README

**Técnica:** Rol + few-shot

**Prompt:**
> "Actúa como un técnico de documentación. Genera un README profesional para este proyecto con las siguientes secciones: descripción, funcionalidades, tecnologías usadas, cómo ejecutarlo localmente y estructura del proyecto. Usa emojis donde tenga sentido. El tono debe ser profesional pero accesible:
> [describir el proyecto]"

**Por qué funciona:**
Definir las secciones exactas evita que la IA genere un README genérico. El rol y el tono garantizan consistencia.

---

## Conclusión

Los prompts más efectivos combinan varias técnicas: un rol claro, restricciones específicas y ejemplos cuando sea posible. Cuanto más contexto le des a la IA, mejor será la respuesta.
