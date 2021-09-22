import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    select: {
        width: '100%'
    },
    option: {
        padding: '0 0 0 16px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    optionText: {
        maxWidth: 'calc(100% - 48px)',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    fieldsButton: {
        padding: '7px 15px'
    },
    addressField: {
        '&.color-1': {
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
        '&.color-2': {
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
        '&.color-3': {
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
        '&.color-4': {
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
        '&.color-5': {
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
        '&.color-6': {
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
        '&.color-7': {
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
        '&.color-8': {
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
        '&.color-9': {
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
        '&.color-10': {
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
    }
}));