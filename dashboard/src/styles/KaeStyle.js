import { makeStyles } from '@material-ui/core/styles';

const KaeStyle = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
      fontWeight: 'bold',
      letterSpacing: '1px',
    },
  }));

  export default KaeStyle;