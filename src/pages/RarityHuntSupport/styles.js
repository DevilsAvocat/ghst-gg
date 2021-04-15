import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: '50px 24px',
        [theme.breakpoints.up('md')]: {
            padding: '50px 32px'
        }
    },
    gotchi: {
        textAlign: 'center'
    },
    gotchiPlaceholder: {
        filter: 'grayscale(100%)'
    },
    fieldsButton: {
        padding: '7px 15px'
    }
}));