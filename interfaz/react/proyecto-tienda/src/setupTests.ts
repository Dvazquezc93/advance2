import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'   // añade comprobaciones como toBeInTheDocument()

// Después de cada prueba, se desmonta lo pintado para empezar la siguiente de cero
afterEach(() => {
  cleanup()
})
