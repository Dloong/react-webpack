import React from "react"
import {
  Dialog,
  Box,
  Typography
} from "@material-ui/core"
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next"
import dialogIcon from "../../assets/images/common/confirm_dialog_icon.png"
import FooterButton from "./FooterButton"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& img": {
        width: "72px",
        height: "72px",
      },
    },
    contentText: {
      fontSize: "16px",
      color: "#222222",
      textAlign: "center",
      padding: "18px 50px",
    },
  })
)

interface AppConfirmDialogProp {
  open: boolean
  content: string
  onConfirm: () => void
  onCancel: () => void
}
export default function AppConfirmDialog(props: AppConfirmDialogProp): any {
  const classes = useStyles()
  const {open, content, onCancel, onConfirm} = props
  const { t } = useTranslation()
  return (
      <Dialog open={open}>
          <Box className={classes.root} py="28px">
              <Box display="flex" justifyContent="center">
                  <img src={dialogIcon} alt="" />
              </Box>
              <Typography className={classes.contentText}>{content}</Typography>
              <Box display="flex" justifyContent="center">
                  <FooterButton
                      pl={1}
                      pr={1}
                      variant="outlined"
                      onClick={onCancel}
          >
                      {t("common.no")}
                  </FooterButton>
                  <FooterButton
                      pl={1}
                      pr={1}
                      variant="contained"
                      color="primary"
                      onClick={onConfirm}
          >
                      {t("common.yes")}
                  </FooterButton>
              </Box>
          </Box>
      </Dialog>
  )
}
