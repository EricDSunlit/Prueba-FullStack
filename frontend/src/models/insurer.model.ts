export interface Insurer {
  id?: number
  name: string
  commission: number
  state: boolean
}

export const InsurerEmpty: Insurer = {
  name: "",
  commission: 0.0,
  state: true
}
