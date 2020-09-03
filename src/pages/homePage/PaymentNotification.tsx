import React from 'react'
import Box from "@material-ui/core/Box"
import { useStyles } from "./HomePageStyle";
import WarningIcon from '@material-ui/icons/Warning';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useTranslation } from "react-i18next";
// import Typography from '@material-ui/core/Typography';
const PaymentNotification =() => {
    const classes = useStyles()
    const {t} = useTranslation()
    return (
     <Box className={classes.payment_notification} display="flex" justifyContent="space-between" pt={2} pb={2} pl={2} pr={2}>
        <WarningIcon color="primary"  fontSize="large" />
    <Box pl={3} pr={2} fontSize={12} color="#ffffff">{t('home.setPayment')}</Box>
        <KeyboardArrowRightIcon fontSize="large"  />
     </Box>
    )
  }

  export default PaymentNotification