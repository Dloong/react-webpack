import React from "react"
import { Box, Theme } from "@material-ui/core"
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Logo from "../../assets/images/common/customer_header_logo.png"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      height: "60px",
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      textAlign: "center",
    },
    logo: {
      height: "33px",
      width: "108px",
      marginTop: "14px",
    },
  })
)

export default function AppCustomerHeader(): any {
  const classes = useStyles()
  return(
      <Box className={classes.header}>
          <img className={classes.logo} src={Logo} alt="" />
      </Box>
  )
}
