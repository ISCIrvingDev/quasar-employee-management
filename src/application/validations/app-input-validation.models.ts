// Modelo de las validaciones de los Inputs
export class AppInputValidationModel {
  public constructor(init?: Partial<AppInputValidationModel>) {
    Object.assign(this, init)
  }

  property: string = ''
  hasErrors: boolean = false
  errMsn: errMsn[] = []
}

export type errMsn = {
  key: string
  value: string
}
