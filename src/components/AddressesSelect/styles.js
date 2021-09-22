import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    select: {
        width: '100%'
    },
    option: {
        padding: '0 16px 0 ',
        display: 'flex',
        justifyContent: 'space-between'
    },
    optionText: {
        maxWidth: 'calc(100% - 48px)',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        flexGrow: 1
    },
    deleteButton: {
        marginRight: -16,
        borderRadius: 0
    },
    metamaskIcon: {
        width: 48,
        height: 48,
        padding: 12,
        marginLeft: -8,
        display: 'block',
        boxSizing: 'border-box',
        '& img': {
            display: 'block',
            width: '100%',
            height: '100%'
        }
    },
    fieldMetamaskIcon: {
        width: 16,
        height: 16, 
        display: 'inline-block',
        marginBottom: -2
    }
}));