import { fade, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: '50px 24px',
        [theme.breakpoints.up('md')]: {
            padding: '50px 32px'
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
    textHighlight: {
        color: theme.palette.primary.main,
        marginLeft: 10
    },
    gotchiPlaceholder: {
        filter: 'grayscale(100%)'
    },
    tokenValue: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    ownerTextHighlight: {
        '&.color-1': {
            color: theme.palette.accounts.color1,
        },
        '&.color-2': {
            color: theme.palette.accounts.color2,
        },
        '&.color-3': {
            color: theme.palette.accounts.color3,
        },
        '&.color-4': {
            color: theme.palette.accounts.color4,
        },
        '&.color-5': {
            color: theme.palette.accounts.color5,
        },
        '&.color-6': {
            color: theme.palette.accounts.color6,
        },
        '&.color-7': {
            color: theme.palette.accounts.color7,
        },
        '&.color-8': {
            color: theme.palette.accounts.color8,
        },
        '&.color-9': {
            color: theme.palette.accounts.color9,
        },
        '&.color-10': {
            color: theme.palette.accounts.color10,
        }
    },
    addressField: {
        '&.highlighted.color-1': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color1,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color1,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color1,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color1,
                },
            },
        },
        '&.highlighted.color-2': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color2,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color2,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color2,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color2,
                },
            },
        },
        '&.highlighted.color-3': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color3,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color3,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color3,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color3,
                },
            },
        },
        '&.highlighted.color-4': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color4,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color4,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color4,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color4,
                },
            },
        },
        '&.highlighted.color-5': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color5,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color5,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color5,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color5,
                },
            },
        },
        '&.highlighted.color-6': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color6,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color6,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color6,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color6,
                },
            },
        },
        '&.highlighted.color-7': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color7,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color7,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color7,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color7,
                },
            },
        },
        '&.highlighted.color-8': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color8,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color8,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color8,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color8,
                },
            },
        },
        '&.highlighted.color-9': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color9,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color9,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color9,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color9,
                },
            },
        },
        '&.highlighted.color-10': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color10,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color10,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color10,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color10,
                },
            },
        }
    },
    fieldsButton: {
        padding: '7px 15px'
    }
}));