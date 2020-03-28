import { makeStyles } from '@material-ui/core/styles';

const appStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default appStyle;