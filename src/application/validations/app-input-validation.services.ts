import type { ValidationError } from 'class-validator'
import type { AppInputValidationModel } from './app-input-validation.models'

/*
 * Ref:
 * https://quasar.dev/vue-components/input#validation
 * https://github.com/typestack/class-validator
 * https://vuelidate-next.netlify.app/
 */
export class AppInputValidationService {
  validateDtoRules(errors: ValidationError[]): AppInputValidationModel {
    let res: AppInputValidationModel = {
      isValid: [true],
      errors: [],
    }

    const mappedValidations: boolean[] = []
    const mappedErrors = errors.map((e: ValidationError) => {
      const errors: string[] = []

      mappedValidations.push(false)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [key, value] of Object.entries(e.constraints)) {
        errors.push(value)
      }

      return errors
    })

    try {
      if (errors.length > 0) {
        res = {
          isValid: mappedValidations,
          errors: mappedErrors,
        }
      }
    } catch (error) {
      console.error('Something wento rwong during the validations: ', error)
    }

    return res
  }
}
