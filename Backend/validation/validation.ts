// validation
import Joi from 'joi'
import PasswordComplexity from 'joi-password-complexity'

//User input Validation
export const userData = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  second_name: Joi.string().allow(''),
  email: Joi.string().email().max(200).required(),
  address: Joi.string(),
  cellphone: Joi.number(),
  password: PasswordComplexity({
    min: 6,
    max: 25,
    lowerCase: 1,
    //upperCase: 1,
    numeric: 1,
    //symbol: 1,
    requirementCount: 4
  }),
  is_verified: Joi.boolean(),
  is_admin: Joi.boolean().optional()
})
