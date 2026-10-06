import { Badge, Button } from 'react-bootstrap'

export default function EnrollmentSummary({ selectedCourses, onClear }) {
  return (
    <section className="summary-card" aria-labelledby="summary-title">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <div>
          <p className="eyebrow light mb-2">TU APRENDIZAJE</p>
          <h2 id="summary-title">Mis inscripciones</h2>
        </div>
        <Badge pill bg="light" text="dark" className="summary-count">{selectedCourses.length}</Badge>
      </div>
      {selectedCourses.length === 0 ? (
        <p className="summary-empty">Aún no tienes cursos. Explora el catálogo y elige por dónde empezar.</p>
      ) : (
        <>
          <ul className="summary-list">
            {selectedCourses.map((course) => <li key={course.id}>{course.title}</li>)}
          </ul>
          <Button variant="link" className="clear-button" onClick={onClear}>Limpiar selección</Button>
        </>
      )}
      <div className="summary-decoration" aria-hidden="true">✳</div>
    </section>
  )
}
