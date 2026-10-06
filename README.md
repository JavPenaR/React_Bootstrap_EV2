# AulaLab

Proyecto de React y React Bootstrap para practicar el diseño de pruebas unitarias. Incluye una interfaz de catálogo de cursos con datos locales y componentes que tienen comportamiento observable. **No incluye pruebas ni dependencias de testing.**

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Ejecutar

```bash
npm install
npm run dev
```

Abre la dirección que muestra Vite (normalmente `http://localhost:5173`). Para comprobar la compilación de producción:

```bash
npm run build
```

## Componentes y comportamientos

| Componente | Qué hace |
| --- | --- |
| `CourseFilters` | Busca por título o descripción y filtra por categoría. |
| `CourseCard` | Muestra los datos y permite inscribirse o quitar la inscripción; deshabilita los cursos sin cupos. |
| `EnrollmentSummary` | Muestra los cursos seleccionados y permite limpiar la selección. |
| `StudentForm` | Valida nombre y correo y muestra una confirmación al enviar datos válidos. |
| `App` | Coordina el catálogo, los filtros y las inscripciones. |

Los cursos están en `src/data/courses.js`. Todo funciona en memoria, sin API ni almacenamiento persistente, para que cada ejecución comience con el mismo estado.
