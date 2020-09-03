import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, IconButton, Toolbar, AppBar, Box} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,

  },
  headerSty:{
    boxShadow: 'none'
  },
  title: {
    flex: '1 90%'
  },
  header_icon:{
    flex: '1 0 10%'
  }
}));


export interface AppHeaderProps {
  isClose?: boolean, // 左侧icon
  showBack?: boolean, // 是否显示左侧icon， 默认显示
  title?: string,
  className?: string,
  endIcon?: any, // 右侧icon
  backgroundColor?: string
  children?:any,
  backTo?: string,
  handleEnd?: ()=>void
}


 function ButtonAppBar(props: AppHeaderProps) {
   const history = useHistory()
  const classes = useStyles();
    const handleBack = ()=> {
      if(props.backTo) {
        history.push(props.backTo)
      } else {
        window.history.go(-1)
      }
    }
    const {title, isClose, endIcon, showBack, backgroundColor, handleEnd, children} = props
  return (
    <div className={ props.className}>
      <AppBar className={classes.headerSty} position="static" style={{backgroundColor}}>
        <Toolbar>
          {
            showBack? <IconButton className={classes.header_icon} edge="start" color="inherit" aria-label="menu" onClick={handleBack}>
            {isClose?<CloseIcon />: <ArrowBackIosIcon />}
          </IconButton> : <Box className={classes.header_icon} display="flex" justifyContent="center">{children}</Box>
          }
          <Typography  variant="h6" className={classes.title}>
            <Box textAlign="center" fontSize={20} fontWeight={600} >
              {title}
            </Box>
          </Typography>
          <Box onClick={handleEnd}  className={classes.header_icon} display="flex" justifyContent="center">
            {endIcon}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.defaultProps ={
  showBack: true,
  backgroundColor: '#ffffff'
}

export default ButtonAppBar