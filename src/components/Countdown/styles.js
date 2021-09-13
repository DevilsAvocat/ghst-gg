
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        textAlign: 'center'
    },
    inner: {
        fontSize: 36,
        minWidth: 80,
        fontWeight: 600,
        position: 'relative',
        padding: '0 10px',
        '&:after': {
            content: '":"',
            position: 'absolute',
            left: '100%',
            top: 5,
            transform: 'translateX(-50%)'
        },

        '&:last-of-type:after': {
            content: 'none'
        }
    },
    number: {
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: 5,
        padding: '6px 4px',
        display: 'inline-block',
    },
    text: {
        display: 'block',
        fontSize: 15,
        margin: '5px 0 0'
    }
}));