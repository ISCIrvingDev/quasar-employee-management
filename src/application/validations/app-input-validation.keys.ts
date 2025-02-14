import type { InjectionKey } from 'vue'
import type { AppInputValidationService } from './app-input-validation.services'

export const AppInputValidationKey = Symbol(
  'AppInputValidationService',
) as InjectionKey<AppInputValidationService>
