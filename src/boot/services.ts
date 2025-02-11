import { defineBoot } from '#q-app/wrappers'
import { DeparmentKey } from 'src/application/api/services/api.keys'
import { DeparmentService } from 'src/application/api/services/department.service'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(({ app }) => {
  // something to do
  /*
   * Services
   */
  const deparmentService = new DeparmentService()

  app.provide(DeparmentKey, deparmentService)
})
