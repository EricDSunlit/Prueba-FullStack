import { useEffect, useState } from "react"
import { InsurerFormModal } from "../../components/InsurerFormModal"
import { ItemDataTable } from "../../components/ItemDataTable"
import { Navbar } from "../../components/Navbar"
import { Insurer, InsurerEmpty, InsurerFormSchema } from "../../models"
import {
  addInsurers,
  deleteInsurers,
  getInsurers,
  editInusrer
} from "../../services/insurer.service"
import { FormProvider, useForm } from "react-hook-form"
import { useModal } from "../../hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material"
import { CustomInput } from "../../components/CustomInput"
import { ApiResponse } from "../../models/api_response.model"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import "./Home.css"

const Home: React.FC = () => {
  const [insurers, setInsurers] = useState<Insurer[]>([])
  const { isOpen, handleModal } = useModal()
  const [insurer, setInsurer] = useState<Insurer>()
  const [isEditing, setIsEditing] = useState<boolean>()
  const [defaultValue, setDefaultValue] = useState<boolean>(false)
  const INSURERS_COLUMNS: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: "commission",
      headerName: "Comision",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}%</>
    },
    {
      field: "state",
      headerName: "Estatus",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>{params.value ? "Activa" : "Inactiva"}</>
      )
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      flex: 1,
      minWidth: 190,
      maxWidth: 200,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <>
            <Button
              variant="contained"
              onClick={() => {
                setInsurer(row)
                setIsEditing(true)
                insurerForm.setValue("name", row.name)
                insurerForm.setValue("commission", row.commission)
                setDefaultValue(row.state)
                handleModal()
              }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(row.id)}
            >
              Borrar
            </Button>
          </>
        ]
      }
    }
  ]

  const insurerForm = useForm<Insurer>({
    defaultValues: InsurerEmpty,
    mode: "onChange",
    resolver: yupResolver(InsurerFormSchema)
  })

  const nameWatch = insurerForm.watch("name")
  const commissionWatch = insurerForm.watch("commission")
  const stateWatch = insurerForm.watch("state")

  const handleDelete = async (id: number) => {
    if (confirm("Esta seguro de eliminar esta aseguradora?")) {
      if (id !== 0) {
        const response = await deleteInsurers(id)
        if (response.success) {
          loadInsurers()
          alert("Eliminada Exitosamente.")
        }
      } else {
        alert("Ha acurrido un error al intentar eliminar la aseguradora.")
      }
    }
  }

  const onSubmit = async () => {
    let response: ApiResponse<Insurer>
    if (isEditing) {
      response = await editInusrer({
        id: insurer?.id,
        name: nameWatch,
        commission: commissionWatch,
        state: stateWatch
      })
    } else {
      response = await addInsurers({
        name: nameWatch,
        commission: commissionWatch,
        state: stateWatch
      })
    }

    if (response.success) {
      handleModal()
      loadInsurers()
      insurerForm.reset()
    }
  }

  const loadInsurers = async () => {
    const response = await getInsurers()
    if (response.success) setInsurers(response.data)
  }

  useEffect(() => {
    loadInsurers()
  }, [])

  return (
    <main className="home_main">
      <Navbar />
      {isOpen && (
        <InsurerFormModal isOpen={isOpen}>
          <FormProvider {...insurerForm}>
            <form onSubmit={insurerForm.handleSubmit(onSubmit)}>
              <CustomInput
                name="name"
                label="Nombre de aseguradora"
                type="text"
                disabled={false}
                required={true}
              />
              <CustomInput
                name="commission"
                label="Comision"
                type="text"
                disabled={false}
                required={true}
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Estado
                </FormLabel>
                <RadioGroup
                  name="state"
                  defaultValue={defaultValue}
                  aria-labelledby="demo-radio-buttons-group-label"
                >
                  <FormControlLabel
                    {...insurerForm.register("state")}
                    value={true}
                    control={<Radio />}
                    label="Activo"
                  />
                  <FormControlLabel
                    {...insurerForm.register("state")}
                    value={false}
                    control={<Radio />}
                    label="Inactivo"
                  />
                </RadioGroup>
              </FormControl>
              <Button type="submit">submit</Button>
              <label
                onClick={() => {
                  handleModal()
                  insurerForm.reset()
                }}
              >
                cancelar
              </label>
            </form>
          </FormProvider>
        </InsurerFormModal>
      )}
      <section className="home_list_section">
        <Button
          onClick={() => {
            setIsEditing(false)
            handleModal()
          }}
        >
          Nueva Aseguradora
        </Button>
        <div className="home_table_container">
          <ItemDataTable data={insurers} columns={INSURERS_COLUMNS} />
        </div>
      </section>
    </main>
  )
}

export default Home
