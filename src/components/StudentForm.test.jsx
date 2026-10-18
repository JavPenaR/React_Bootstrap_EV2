import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StudentForm from './StudentForm.jsx'

// Probamos el comportamiento que ve una persona al completar el formulario.
// Cada prueba parte de un componente nuevo para que el estado no pase de un caso a otro.
afterEach(cleanup)

describe('StudentForm', () => {
  it('rechaza un nombre de menos de dos caracteres aunque el correo sea válido', async () => {
    const user = userEvent.setup()
    render(<StudentForm />)

    await user.type(screen.getByRole('textbox', { name: 'Nombre' }), 'A')
    await user.type(screen.getByRole('textbox', { name: 'Correo electrónico' }), 'ana@ejemplo.com')
    await user.click(screen.getByRole('button', { name: /Suscribirme/i }))

    // El envío inválido debe explicar el problema y no mostrar una confirmación.
    expect(screen.getByText('Ingresa al menos 2 caracteres.')).toBeTruthy()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('rechaza un correo sin formato válido aunque el nombre sea válido', async () => {
    const user = userEvent.setup()
    render(<StudentForm />)

    await user.type(screen.getByRole('textbox', { name: 'Nombre' }), 'Ana')
    await user.type(screen.getByRole('textbox', { name: 'Correo electrónico' }), 'correo-invalido')
    await user.click(screen.getByRole('button', { name: /Suscribirme/i }))

    expect(screen.getByText('Ingresa un correo válido.')).toBeTruthy()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('confirma un envío válido y limpia ambos campos', async () => {
    const user = userEvent.setup()
    render(<StudentForm />)

    const name = screen.getByRole('textbox', { name: 'Nombre' })
    const email = screen.getByRole('textbox', { name: 'Correo electrónico' })
    await user.type(name, 'Ana')
    await user.type(email, 'ana@ejemplo.com')
    await user.click(screen.getByRole('button', { name: /Suscribirme/i }))

    // El mensaje y el reinicio de los campos son el resultado esperado del envío.
    expect(screen.getByRole('status').textContent).toContain('¡Listo!')
    expect(name.value).toBe('')
    expect(email.value).toBe('')
  })
})
