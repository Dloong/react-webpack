import {
  Theme,
  LinearProgress,
} from "@material-ui/core"
import { createStyles, withStyles } from '@material-ui/core/styles';

const AppBorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 8,
      borderRadius: 4,
    },
    colorPrimary: {
      backgroundColor: theme.palette.text.disabled,
    },
    bar: {
      borderRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
  })
)(LinearProgress)

export default AppBorderLinearProgress
