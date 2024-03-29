import { z } from 'zod'

export const adSchemaCreated = z.object({
  name: z.string({
    required_error: 'Name is required'
  }).min(3).max(255),
  ad: z.string({
    required_error: 'Ad is required'
  }).url({
    message: 'Ad must be a valid URL'
  }),
  start_date: z.coerce.date({
    required_error: 'Start date is required'
  }),
  end_date: z.coerce.date({
    required_error: 'End date is required'
  }),
  description: z.string().min(3).max(255).optional(),
  id_company: z.number({
    required_error: 'Company ID is required'
  }).int({
    message: 'Company ID must be an integer'
  })
})

export const adSchemaUpdated = z.object({
  name: z.string().min(3).max(255).optional(),
  ad: z.string().url({
    message: 'Ad must be a valid URL'
  }).optional(),
  start_date: z.coerce.date({
    required_error: 'Start date must be a valid date'
  }).optional(),
  end_date: z.coerce.date({
    required_error: 'End date must be a valid date'
  }).optional(),
  description: z.string().min(3).max(255).optional(),
  id_company: z.number({
    required_error: 'Company ID must be an integer'
  }).int().optional()
})

export const adSchemaGet = z.object({
  exact_date: z.boolean({
    required_error: 'Exact date must be a boolean'
  }).optional(),
  start_date: z.coerce.date({
    required_error: 'Start date must be a valid date'
  }).optional(),
  end_date: z.coerce.date({
    required_error: 'End date must be a valid date'
  }).optional(),
  id_company: z.number({
    required_error: 'Company ID must be an integer'
  }).int().optional(),
  published_ads: z.boolean({
    required_error: 'Published ads must be a boolean'
  }).optional()
})
