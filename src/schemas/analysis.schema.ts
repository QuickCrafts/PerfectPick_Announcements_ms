/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'

export const Like_Relation_Schema = z.object({
  id: z.number({
    required_error: 'ID is required'
  }).int({
    message: 'ID must be an integer'
  }),
  user_id: z.number({
    required_error: 'User ID is required'
  }).int({
    message: 'User ID must be an integer'
  }),
  type: z.enum(['MOV', 'BOO', 'SON'], {
    required_error: 'Type is required'
  }),
  rating: z.number().optional(),
  like_type: z.enum(['LK', 'DLK', 'BLK'], {
    required_error: 'Like type is required'
  }),
  wishlist: z.boolean({
    required_error: 'Wishlist must be a boolean'
  })
})

export const Country_Schema = z.object({
  id: z.number({
    required_error: 'ID is required'
  }).int({
    message: 'ID must be an integer'
  }),
  name: z.string({
    required_error: 'Name is required'
  }).min(3).max(255),
  code2: z.string({
    required_error: 'Code2 is required'
  }).min(3).max(255),
  code3: z.string({
    required_error: 'Code3 is required'
  }).min(3).max(255)
})

export const Get_User_Schema = z.object({
  id: z.number({
    required_error: 'ID is required'
  }).int({
    message: 'ID must be an integer'
  }),
  firstname: z.string().min(1).max(255),
  lastname: z.string().min(1).max(255),
  avatar_url: z.string().url({
    message: 'Avatar URL must be a valid URL'
  }).optional(),
  birthdate: z.date({
    required_error: 'Birthdate must be a valid date'
  }).optional(),
  gender: z.enum(['M', 'F', 'O', 'P']).optional(),
  country: Country_Schema.optional(),
  created_time: z.date({
    required_error: 'Created time must be a valid date'
  }),
  email: z.string().email({
    message: 'Email must be a valid email'
  }),
  verified: z.boolean({
    required_error: 'Verified must be a boolean'
  }),
  setup: z.boolean({
    required_error: 'Setup must be a boolean'
  })
})

export const Analysis_Schema = z.object({
  likes: z.array(Like_Relation_Schema),
  users: z.array(Get_User_Schema)
})
