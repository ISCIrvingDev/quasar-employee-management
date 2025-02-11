export class AppResponseModel<T> {
  public success: boolean
  public data: T

  constructor(init?: Partial<AppResponseModel<T>>) {
    Object.assign(this, init)
  }
}

export class AppErrorResponseModel {
  public statusCode: number
  public timestamp: string
  public path: string
  public name: string
  public stack: string
  public message: string | [string]

  constructor(init?: Partial<AppErrorResponseModel>) {
    Object.assign(this, init)
  }
}
