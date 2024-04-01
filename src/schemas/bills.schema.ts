import { z } from 'zod'

export const billSchemaCreated = z.object({
  id_ad: z.number({
    required_error: 'Ad ID is required'
  }).int({
    message: 'Ad ID must be an integer'
  }),
  amount: z.number({
    required_error: 'Amount is required'
  }).int({
    message: 'Amount must be an integer'
  })
})

export const billSchemaGet = z.object({
  id_company: z.number().int({
    message: 'Company ID must be an integer'
  }).optional(),
  id_ad: z.number().int({
    message: 'Ad ID must be an integer'
  }).optional(),
  status: z.enum(['CREATED', 'PAID', 'CANCELED']).optional()
})
