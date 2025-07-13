export interface Result<TData> {
    success: boolean
    status: number
    message: string
    errors: string[],
    data: TData
}
