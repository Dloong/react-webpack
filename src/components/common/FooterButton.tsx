import React from "react"
import { Button, ButtonProps, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"

const useStyles = makeStyles(() => ({
  footerButton: {
    borderRadius: 50,
    height: "44px",
    minWidth: "100px",
    lineHeight:'15px'
  },
  hasShadow: {
    boxShadow:
      "0 2px 8px 0 rgba(0,0,0,0.10), 0 4px 8px -4px rgba(255,184,3,0.50)",
  },
}))
export interface FooterButtonProps {
  pl?: number
  pr?: number
}

function FooterButton(props: ButtonProps & FooterButtonProps) {
  const classes = useStyles()
  const { children, pl, pr } = props
  return (
    <Box pl={pl} pr={pr}>
      <Button
        {...props}
        size="large"
        className={
          props.variant === "contained"
            ? clsx(classes.footerButton, classes.hasShadow)
            : classes.footerButton
        }
      >
        {children}
      </Button>
    </Box>
  )
}
FooterButton.defaultProps = {
  pl: 2,
  pr: 2,
}

export default FooterButton
