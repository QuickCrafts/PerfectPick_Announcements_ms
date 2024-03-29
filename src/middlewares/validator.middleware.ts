/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Request, Response, NextFunction } from 'express'
import { SomeZodObject, ZodError } from 'zod'

export const validateSchema = (schema: SomeZodObject) => (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    schema.parse(req.body)
    return next()
  } catch (error) {
    return res.status(400).json({ error: (error as ZodError).issues.map((issue) => issue.message) })
  }
}

export const validateDate = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { start_date, end_date } = req.body
  try {
    const startDate = new Date(start_date)
    const endDate = new Date(end_date)
    if (startDate > endDate) {
      return res.status(400).json({ error: 'Start date must be before end date' })
    }
    return next()
  } catch (error) {
    return res.status(400).json({ error: 'Invalid date' })
  }
}
