import { defineBoot } from '#q-app/wrappers'
import { DeparmentKey } from 'src/application/api/services/api.keys'
import { DeparmentService } from 'src/application/api/services/department.service'
import { AppInputValidationKey } from 'src/application/validations/app-input-validation.keys'
import { AppInputValidationService } from 'src/application/validations/app-input-validation.services'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(({ app }) => {
  // something to do
  /*
   * Services
   */
  const deparmentService = new DeparmentService()
  const appInputValidationService = new AppInputValidationService()

  app.provide(DeparmentKey, deparmentService)
  app.provide(AppInputValidationKey, appInputValidationService)
})
