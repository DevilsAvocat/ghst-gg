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
    buttonsAlignment: {
        marginLeft: 'auto'
    },
    tokenValue: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    gotchi: {
        display: 'block',
        borderRadius: theme.shape.borderRadius,
        color: '#fff',
        padding: '24px 12px 16px',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
        '&:hover': {
            textDecoration: 'none'
        },
        '&.color-1': {
            backgroundColor: fade(theme.palette.rewards.color1, .2),
        },
        '&.color-2': {
            backgroundColor: fade(theme.palette.rewards.color2, .2),
        },
        '&.color-3': {
            backgroundColor: fade(theme.palette.rewards.color3, .2),
        },
        '&.color-4': {
            backgroundColor: fade(theme.palette.rewards.color4, .2),
        },
        '&.color-5': {
            backgroundColor: fade(theme.palette.rewards.color5, .2),
        },
        '&.color-6': {
            backgroundColor: fade(theme.palette.rewards.color6, .2),
        },
        '&.color-7': {
            backgroundColor: fade(theme.palette.rewards.color7, .2),
        },
        '&.color-8': {
            backgroundColor: fade(theme.palette.rewards.color8, .2),
        },
        '&.color-9': {
            backgroundColor: fade(theme.palette.rewards.color9, .2),
        },
        '&.color-10': {
            backgroundColor: fade(theme.palette.rewards.color10, .2),
        }
    },
    owner: {
        borderRadius: theme.shape.borderRadius,
        fontSize: 12,
        padding: '2px 4px',
        '&.color-1': {
            backgroundColor: theme.palette.rewards.color1,
        },
        '&.color-2': {
            backgroundColor: theme.palette.rewards.color2,
        },
        '&.color-3': {
            backgroundColor: theme.palette.rewards.color3,
        },
        '&.color-4': {
            backgroundColor: theme.palette.rewards.color4,
        },
        '&.color-5': {
            backgroundColor: theme.palette.rewards.color5,
        },
        '&.color-6': {
            backgroundColor: theme.palette.rewards.color6,
        },
        '&.color-7': {
            backgroundColor: theme.palette.rewards.color7,
        },
        '&.color-8': {
            backgroundColor: theme.palette.rewards.color8,
        },
        '&.color-9': {
            backgroundColor: theme.palette.rewards.color9,
        },
        '&.color-10': {
            backgroundColor: theme.palette.rewards.color10,
        }
    },
    gotchiOwner: {
        position: 'absolute',
        top: 0,
        right: '50%',
        transform: 'translate(50%, -50%)',
        color: '#fff'
    },
    addressField: {
        '&.highlighted.color-1': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color1,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color1,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color1,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color1,
                },
            },
        },
        '&.highlighted.color-2': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color2,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color2,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color2,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color2,
                },
            },
        },
        '&.highlighted.color-3': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color3,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color3,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color3,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color3,
                },
            },
        },
        '&.highlighted.color-4': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color4,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color4,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color4,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color4,
                },
            },
        },
        '&.highlighted.color-5': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color5,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color5,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color5,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color5,
                },
            },
        },
        '&.highlighted.color-6': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color6,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color6,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color6,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color6,
                },
            },
        },
        '&.highlighted.color-7': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color7,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color7,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color7,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color7,
                },
            },
        },
        '&.highlighted.color-8': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color8,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color8,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color8,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color8,
                },
            },
        },
        '&.highlighted.color-9': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color9,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color9,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color9,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color9,
                },
            },
        },
        '&.highlighted.color-10': {
            '& label.Mui-focused': {
                color: theme.palette.rewards.color10,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.rewards.color10,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.rewards.color10,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.rewards.color10,
                },
            },
        }
    },
    wearable: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.dark,
        padding: '16px 12px',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
        '&.common': {
            backgroundColor: fade(theme.palette.rarity.common, .1)
        },
        '&.uncommon': {
            backgroundColor: fade(theme.palette.rarity.uncommon, .1)
        },
        '&.rare': {
            backgroundColor: fade(theme.palette.rarity.rare, .1)
        },
        '&.legendary': {
            backgroundColor: fade(theme.palette.rarity.legendary, .1)
        },
        '&.mythical': {
            backgroundColor: fade(theme.palette.rarity.mythical, .1)
        },
        '&.godlike': {
            backgroundColor: fade(theme.palette.rarity.godlike, .1)
        },
    },
    wearableTitle: {
        '&.common': {
            color: theme.palette.rarity.common
        },
        '&.uncommon': {
            color: theme.palette.rarity.uncommon
        },
        '&.rare': {
            color: theme.palette.rarity.rare
        },
        '&.legendary': {
            color: theme.palette.rarity.legendary
        },
        '&.mythical': {
            color: theme.palette.rarity.mythical
        },
        '&.godlike': {
            color: theme.palette.rarity.godlike
        },
    },
    fieldsButton: {
        padding: '7px 15px'
    }
}));