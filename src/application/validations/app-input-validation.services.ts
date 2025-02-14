import type { ValidationError } from 'class-validator'
import { AppInputValidationModel } from './app-input-validation.models'

/*
 * Ref:
 * https://quasar.dev/vue-components/input#validation
 * https://github.com/typestack/class-validator
 * https://vuelidate-next.netlify.app/
 */
export class AppInputValidationService {
  validateDtoRules(errors: ValidationError[]): AppInputValidationModel[] {
    const res: AppInputValidationModel[] = []

    errors.forEach((e: ValidationError) => {
      const newAppInputValidation = new AppInputValidationModel({
        property: e.property,
        hasErrors: true,
        errMsn: [],
      })

      for (const [key, value] of Object.entries(e.constraints)) {
        newAppInputValidation.errMsn.push({ key, value })
      }

      res.push(newAppInputValidation)
    })

    return res
  }
}
