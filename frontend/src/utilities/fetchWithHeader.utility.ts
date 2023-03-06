import { API_CONSTANTS } from "../services"

export const fetchWithHeader = async (url: string, options?: RequestInit) => {
  const { key, value } = API_CONSTANTS.authHeader
  const headers = new Headers()
  headers.append(key, value)
  headers.append("Content-Type", "application/json")

  const currentOptions = options || {}
  currentOptions.headers = headers

  const response = await fetch(url, currentOptions)

  //   if (!response.ok) {
  //     throw new Error("Algo salio mal al realizar la peticion")
  //   }

  const data = await response.json()
  return data
}
