import { Badge, Button, Card } from 'react-bootstrap'

export default function CourseCard({ course, enrolled, onToggle }) {
  const full = course.seats === 0

  return (
    <Card className="course-card h-100 border-0">
      <Card.Body className="d-flex flex-column p-4">
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div className={`course-icon ${course.color}`} aria-hidden="true">{course.icon}</div>
          <Badge bg={full ? 'secondary' : 'light'} text={full ? undefined : 'dark'} className="seat-badge">
            {full ? 'Cupos agotados' : `${course.seats} cupos`}
          </Badge>
        </div>
        <div className="course-meta mb-2">{course.category} <span>·</span> {course.level}</div>
        <Card.Title as="h3" className="course-title">{course.title}</Card.Title>
        <Card.Text className="course-description">{course.description}</Card.Text>
        <div className="mt-auto pt-3 d-flex align-items-center justify-content-between gap-2">
          <span className="duration">◷ <span className="visually-hidden">Duración:</span> {course.duration}</span>
          <Button
            variant={enrolled ? 'outline-primary' : 'primary'}
            size="sm"
            disabled={full}
            onClick={() => onToggle(course.id)}
            aria-label={`${enrolled ? 'Quitar inscripción a' : 'Inscribirme en'} ${course.title}`}
          >
            {full ? 'No disponible' : enrolled ? 'Inscrito ✓' : 'Inscribirme'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
