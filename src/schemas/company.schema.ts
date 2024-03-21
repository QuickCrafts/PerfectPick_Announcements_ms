import { z } from 'zod'

export const companySchemaCreated = z.object({
  name: z.string({
    required_error: 'Name is required'
  }).min(3).max(255),
  email: z.string({
    required_error: 'Email is required'
  }).email({
    message: 'Email must be a valid email'
  })
})
export const companySchemaUpdated = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email({
    message: 'Email must be a valid email'
  }).optional()
})
