export const timeout = async (time: number, promise: Promise<any>): Promise<any> => {
  return await new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request Timeout'))
    }, time)

    promise.then(
      (value: any) => {
        clearTimeout(timeoutId)
        resolve(value)
      },
      (reason: any) => {
        clearTimeout(timeoutId)
        reject(new Error(reason as string))
      }
    )
  })
}
