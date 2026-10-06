import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'

const initialValues = { name: '', email: '' }

export default function StudentForm() {
  const [values, setValues] = useState(initialValues)
  const [submitted, setSubmitted] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const nameIsValid = values.name.trim().length >= 2
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())

  function handleSubmit(event) {
    event.preventDefault()
    setShowErrors(true)
    setSubmitted(false)

    if (!nameIsValid || !emailIsValid) return

    setSubmitted(true)
    setShowErrors(false)
    setValues(initialValues)
  }

  return (
    <section className="form-card" aria-labelledby="form-title">
      <div className="form-icon" aria-hidden="true">✉</div>
      <p className="eyebrow mb-2">SIGUE APRENDIENDO</p>
      <h2 id="form-title">Recibe novedades</h2>
      <p className="form-intro">Entérate de los próximos cursos y recursos para seguir practicando.</p>
      {submitted && <Alert variant="success" role="status">¡Listo! Te avisaremos de las novedades.</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="student-name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            value={values.name}
            onChange={(event) => setValues({ ...values, name: event.target.value })}
            isInvalid={showErrors && !nameIsValid}
            placeholder="Tu nombre"
            autoComplete="name"
          />
          <Form.Control.Feedback type="invalid">Ingresa al menos 2 caracteres.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="student-email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
            isInvalid={showErrors && !emailIsValid}
            placeholder="tu@correo.com"
            autoComplete="email"
          />
          <Form.Control.Feedback type="invalid">Ingresa un correo válido.</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="w-100 submit-button">Suscribirme <span aria-hidden="true">↗</span></Button>
      </Form>
    </section>
  )
}
