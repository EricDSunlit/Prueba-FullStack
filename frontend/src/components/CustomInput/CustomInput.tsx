import { TextField, Typography } from "@mui/material"
import React from "react"
import { useFormContext } from "react-hook-form"
export interface CustomInputProps {
  name: string
  label: string
  type: string
  disabled: boolean
  required: boolean
}

const formValidation = (errors: any, errorKey: string) => {
  return errors[errorKey] ? (
    <Typography color="error">{errors[errorKey].message}</Typography>
  ) : (
    ""
  )
}

const CustomInput: React.FC<CustomInputProps> = ({
  name = "",
  label = "",
  type = "text",
  disabled = false,
  required = true
}) => {
  const {
    register,
    formState: { errors, isDirty, touchedFields }
  } = useFormContext()

  return (
    <div>
      <TextField
        required={required}
        disabled={disabled}
        type={type}
        error={errors && !!errors[name]}
        id={name}
        label={label}
        variant="outlined"
        {...register(name)}
        fullWidth
      />
      {errors && formValidation(errors, name)}
    </div>
  )
}

export default CustomInput
