import { AppBar, Toolbar, Typography } from "@mui/material"
import React from "react"
export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
          align="center"
        >
          Listado de aseguradoras
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
