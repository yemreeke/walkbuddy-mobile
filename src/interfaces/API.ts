export interface IApiResponseError {
    status: number
    error: string
    errorDesc: string
}
export interface IApiResponse<T> {
    status: number
    message: string
    data: T
}

export type ILoginResponse = {
    user: IUserDto
    token: string
}
export type IUserDto = {
    id: number
    name: string
    surname: string
    email: string
    iban_no: string
    coin_count: string
}