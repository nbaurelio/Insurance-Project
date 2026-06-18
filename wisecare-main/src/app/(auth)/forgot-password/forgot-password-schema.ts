import { z } from 'zod'

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
})

export default ForgotPasswordSchema
