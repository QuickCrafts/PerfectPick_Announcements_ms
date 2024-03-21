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
