import { makeStyles, fade } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        height: '100%',
        overflowY: 'auto',
        padding: 20
    },
    gotchi: {
        borderRadius: 4,
        width: 150,
        padding: 30,
        transition: 'background-color .3s ease-in-out',
        '& img': {
            height: 90,
            width: 90,
            filter: 'drop-shadow( 0px 0px 7px rgba(255,255,209,.5))'
        },
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: fade(theme.palette.primary.main, .1)
        }
    },
    gotchiName: {
        textAlign: 'center',
        fontSize: 20,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingBottom: 15
    },
    goBack: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        position: "fixed",
        bottom: 20,
        left: 0
    },
    goBackButtonText: {
        textTransform: 'uppercase',
        marginLeft: 8,
        fontWeight: 500
    },
    backdrop: {
        zIndex: theme.zIndex.appBar - 1,
        color: '#fff'
    }
}));
