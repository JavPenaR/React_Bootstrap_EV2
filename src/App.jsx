import { useMemo, useState } from 'react'
import { Alert, Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import CourseCard from './components/CourseCard.jsx'
import CourseFilters from './components/CourseFilters.jsx'
import EnrollmentSummary from './components/EnrollmentSummary.jsx'
import StudentForm from './components/StudentForm.jsx'
import { courses } from './data/courses.js'

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const [selectedIds, setSelectedIds] = useState([])

  const visibleCourses = useMemo(() => courses.filter((course) => {
    const matchesCategory = category === 'Todos' || course.category === category
    const matchesQuery = `${course.title} ${course.description}`.toLocaleLowerCase('es').includes(query.trim().toLocaleLowerCase('es'))
    return matchesCategory && matchesQuery
  }), [category, query])

  const selectedCourses = courses.filter((course) => selectedIds.includes(course.id))

  function toggleEnrollment(id) {
    const course = courses.find((item) => item.id === id)
    if (!course || course.seats === 0) return
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <>
      <header className="site-header">
        <Navbar expand="md" className="py-3">
          <Container>
            <Navbar.Brand href="#inicio" className="brand"><span className="brand-mark">✳</span> aula<span>lab</span><span className="brand-dot">.</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navigation" />
            <Navbar.Collapse id="main-navigation">
              <Nav className="ms-auto align-items-md-center gap-md-4">
                <Nav.Link href="#cursos">Cursos</Nav.Link>
                <Nav.Link href="#novedades">Novedades</Nav.Link>
                <Nav.Link href="#inscripciones" className="nav-count">Mis cursos <span>{selectedIds.length}</span></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main id="inicio">
        <section className="hero">
          <Container>
            <Row className="align-items-center gy-4">
              <Col lg={7}>
                <span className="hero-kicker">✦ APRENDE ALGO NUEVO HOY</span>
                <h1>Tu próxima gran idea <span>empieza aquí.</span></h1>
                <p>Explora cursos breves, prácticos y pensados para que avances paso a paso en el mundo digital.</p>
                <Button href="#cursos" size="lg" className="hero-button">Explorar cursos <span aria-hidden="true">↗</span></Button>
              </Col>
              <Col lg={5} className="d-none d-lg-block">
                <div className="hero-art" aria-hidden="true">
                  <div className="art-orbit orbit-one" />
                  <div className="art-orbit orbit-two" />
                  <div className="art-card art-card-back">&lt; / &gt;</div>
                  <div className="art-card art-card-front"><span>✳</span><strong>Aprende.<br />Practica.<br />Crea.</strong></div>
                  <div className="art-star">✦</div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Container className="content-section" id="cursos">
          <CourseFilters query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} />
          <Row className="g-4 mt-1">
            <Col lg={8}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="results-label mb-0">{visibleCourses.length} {visibleCourses.length === 1 ? 'curso disponible' : 'cursos disponibles'}</p>
              </div>
              {visibleCourses.length === 0 ? (
                <Alert variant="light" className="empty-results">No encontramos cursos con esos filtros. Prueba otra búsqueda.</Alert>
              ) : (
                <Row className="g-3">
                  {visibleCourses.map((course) => (
                    <Col md={6} key={course.id}>
                      <CourseCard course={course} enrolled={selectedIds.includes(course.id)} onToggle={toggleEnrollment} />
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
            <Col lg={4}>
              <div className="sidebar-stack">
                <div id="inscripciones"><EnrollmentSummary selectedCourses={selectedCourses} onClear={() => setSelectedIds([])} /></div>
                <div id="novedades"><StudentForm /></div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <footer className="site-footer"><Container className="d-flex flex-column flex-sm-row justify-content-between gap-2"><span><strong>✳ aulalab.</strong> Aprende haciendo.</span><span>Un espacio para explorar y crecer.</span></Container></footer>
    </>
  )
}
