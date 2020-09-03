import React from "react"
import { Box, Typography } from "@material-ui/core"
import empty from "../../assets/images/common/empty.png"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(() => ({
  root: {
    width: "80vw",
  },
}))
interface PageEmptyProps {
  primaryText?: string
  secondaryText?: string
}
function PageEmpty(props: PageEmptyProps) {
  const classes = useStyles()
  return (
    <Box className={classes.root} ml={"auto"} mr={"auto"} mt={8}>
      <Box display="flex" justifyContent="center">
        <img src={empty} alt="" />
      </Box>
      <Box display="flex" mt={4} color="text.disabled" justifyContent="center">
        <Typography variant="h5" align="center">
          {props.primaryText}
        </Typography>
      </Box>
      <Box display="flex" mt={2} color="text.disabled" justifyContent="center">
        <Typography variant="inherit" align="center">
          {props.secondaryText}
        </Typography>
      </Box>
    </Box>
  )
}

export default PageEmpty
