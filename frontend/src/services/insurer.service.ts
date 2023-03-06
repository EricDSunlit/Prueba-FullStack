import { API_CONSTANTS } from "./services_constants"
import { fetchWithHeader } from "../utilities/fetchWithHeader.utility"
import { ApiResponse, Insurer } from "../models"

export const insurerURL = `${API_CONSTANTS.baseURL}insurer`

export const getInsurers = async () => {
  const response: ApiResponse<Insurer[]> = await fetchWithHeader(insurerURL)
  return response
}

export const addInsurers = async (body: Insurer) => {
  body.state = body.state.toString() === "true" ? true : false
  body.commission = parseFloat(body.commission.toString())

  const response: ApiResponse<Insurer> = await fetchWithHeader(insurerURL, {
    method: "POST",
    body: JSON.stringify(body)
  })
  return response
}

export const deleteInsurers = async (id: number) => {
  const response: ApiResponse<Insurer> = await fetchWithHeader(
    `${insurerURL}/${id}`,
    { method: "DELETE" }
  )
  return response
}

export const editInusrer = async (body: Insurer) => {
  body.state = body.state.toString() === "true" ? true : false
  body.commission = parseFloat(body.commission.toString())

  const response: ApiResponse<Insurer> = await fetchWithHeader(insurerURL, {
    method: "PUT",
    body: JSON.stringify(body)
  })
  console.log(response)
  return response
}
