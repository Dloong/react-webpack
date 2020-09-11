import React from 'react';
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Loading from "@/components/loading/Loading"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 180,
    },
    wrapper: {
      width: '95vw',
    }
  }),
);

export default function SimpleSlide():React.ReactElement {
  const classes = useStyles();


  return (
      <div className={classes.root}>
          <Box height="80vh" className={classes.wrapper} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Box textAlign="center" fontWeight="bolder" fontSize={20} mb={14}>Welecome To TWR-CLI</Box>
              <Box >
                  <Loading />
              </Box>
          </Box>
      </div>
  );
}
