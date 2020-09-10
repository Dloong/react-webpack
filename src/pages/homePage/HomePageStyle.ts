
import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff"
    },
    home_header: {

    },
    home_container: {
      flex: 5,
      display: 'flex',
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    po_number_text: {
      textTransform: 'inherit',
      fontSize: "18px",
      padding: theme.spacing(3),
      boxShadow: '0px 6px 18px -1px rgba(0,0,0,0.12)',
      fontWeight: 500
    },
    home_bottom_btn_group: {
      flex: '0 0 48%',
      display: 'flex',
      borderRadius: 4,
      height: 115,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: '15px 0',
      background: '#ffffff',
      boxShadow: '0px 6px 18px -1px rgba(0,0,0,0.12)'
    },
    home_bottom_btn_text: {
      paddingTop: '10px'
    },
    payment_notification: {
      backgroundColor: theme.palette.error.main,
      color: "#fff"
    }
  }));