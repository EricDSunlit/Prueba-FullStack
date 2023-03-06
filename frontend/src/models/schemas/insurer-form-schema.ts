import * as yup from "yup"
import { Insurer } from "../insurer.model"
let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/

export const InsurerFormSchema = yup.object({
  name: yup
    .string()
    .required("El nombre de la aseguradora es requerido.")
    .max(45, "No se permiten mas de 45 caracteres."),
  commission: yup
    .number()
    .required("El porcentaje de comision es requerido.")
    .max(25.0, "Ha superado el maximo del porcentaje de comision.")
    .test(
      "is-decimal",
      "El porcentaje de comision es un numero con maximo 2 digitos decimales.",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val)
        }
        return true
      }
    ),
  state: yup.bool()
})
