import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';



  function a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    tab_header: {
        backgroundColor: theme.palette.background.paper,
        borderTop: "1px solid #dedede"
    }
  }));

  export interface TabHeaderProps {
    list: any,
    onChange: (newValue: number) => void;
  }
  interface TabHeaderItemProps {
    label: string
  }
  export default function TabHeader(props: TabHeaderProps) {
    const {list, onChange} = props
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      console.log(event);
      setValue(newValue);
      onChange(newValue)
    };

    return (
      <div className={classes.root}>
          <Box >
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                className={classes.tab_header}
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                {
                    list.map((item:TabHeaderItemProps, index:number) => {
                      return   <Tab key={item.label} label={item.label} {...a11yProps(index)} />
                    })
                }
            </Tabs>
          </Box>

      </div>
    );
  }