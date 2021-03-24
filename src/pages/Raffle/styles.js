
import { fade, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
    raffle: {
        padding: '50px 16px',
        [theme.breakpoints.up('sm')]: {
            padding: '50px 24px',
        }
    },
    title: {
        fontSize: 32,
        marginBottom: 40,
        [theme.breakpoints.up('md')]: {
            fontSize: 36
        }
    },
    subtitle: {
        fontSize: 19,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 400
    },
    subtitleIcon: {
        marginLeft: 8
    },
    row: {
        marginBottom: 32
    },
    input: {
        '& label:first-letter': {
            textTransform: 'uppercase'
        },
        '&.common': {
            '& input ': {
                color: theme.palette.rarity.common
            },
            '& label ': {
                color: theme.palette.rarity.common
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.common,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.common
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.common
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.common
            }
        },
        '&.uncommon': {
            '& input ': {
                color: theme.palette.rarity.uncommon
            },
            '& label ': {
                color: theme.palette.rarity.uncommon
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.uncommon,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.uncommon
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.uncommon
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.uncommon
            }
        },
        '&.rare': {
            '& input ': {
                color: theme.palette.rarity.rare
            },
            '& label ': {
                color: theme.palette.rarity.rare
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.rare,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.rare
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.rare
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.rare
            }
        },
        '&.legendary': {
            '& input ': {
                color: theme.palette.rarity.legendary
            },
            '& label ': {
                color: theme.palette.rarity.legendary
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.legendary,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.legendary
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.legendary
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.legendary
            }
        },
        '&.mythical': {
            '& input ': {
                color: theme.palette.rarity.mythical
            },
            '& label ': {
                color: theme.palette.rarity.mythical
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.mythical,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.mythical
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.mythical
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.mythical
            }
        },
        '&.godlike': {
            '& input ': {
                color: theme.palette.rarity.godlike
            },
            '& label ': {
                color: theme.palette.rarity.godlike
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.godlike,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.godlike
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.godlike
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.godlike
            }
        }
    },
    ticketBg: {
        position: 'relative',
        marginBottom: 4,
        padding: '6px !important',
        '& img': {
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.1,
            pointerEvent: 'none'
        }
    },
    price: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chance: {
        '&.common.highlighted': { backgroundColor: fade(theme.palette.rarity.common, .05) },
        '&.uncommon.highlighted': { backgroundColor: fade(theme.palette.rarity.uncommon, .05) },
        '&.rare.highlighted': { backgroundColor: fade(theme.palette.rarity.rare, .05) },
        '&.legendary.highlighted': { backgroundColor: fade(theme.palette.rarity.legendary, .05) },
        '&.mythical.highlighted': { backgroundColor: fade(theme.palette.rarity.mythical, .05) },
        '&.godlike.highlighted': { backgroundColor: fade(theme.palette.rarity.godlike, .05) }
    },
    textHighlight: {
        position: 'relative',
        zIndex: 5,
        '&.common': {color: theme.palette.rarity.common},
        '&.uncommon': {color: theme.palette.rarity.uncommon},
        '&.rare': {color: theme.palette.rarity.rare},
        '&.legendary': {color: theme.palette.rarity.legendary},
        '&.mythical': {color: theme.palette.rarity.mythical},
        '&.godlike': {color: theme.palette.rarity.godlike}
    },
    tableValue: {
        fontSize: 19,
        fontWeight: 400
    },
    wearablesTitle: {
        marginBottom: 12,
        fontSize: 19,
        textAlign: 'center',
        '&:first-letter': {
          textTransform: 'uppercase'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        }
    },
    wearable: {
        borderRadius: theme.shape.borderRadius,
        height: '100%',
        padding: '16px 12px',
        textAlign: 'center',
        '&.common': {
            backgroundColor: fade(theme.palette.rarity.common, .1),
        },
        '&.uncommon': {
            backgroundColor: fade(theme.palette.rarity.uncommon, .1),
            '&.mystery': {
                backgroundColor: fade(theme.palette.rarity.uncommon, .15)
            }
        },
        '&.rare': {
            backgroundColor: fade(theme.palette.rarity.rare, .1),
            '&.mystery': {
                backgroundColor: fade(theme.palette.rarity.rare, .15)
            }
        },
        '&.legendary': {
            backgroundColor: fade(theme.palette.rarity.legendary, .1),
            '&.mystery': {
                backgroundColor: fade(theme.palette.rarity.legendary, .15)
            }
        },
        '&.mythical': {
            backgroundColor: fade(theme.palette.rarity.mythical, .1),
            '&.mystery': {
                backgroundColor: fade(theme.palette.rarity.mythical, .15)
            }
        },
        '&.godlike': {
            backgroundColor: fade(theme.palette.rarity.godlike, .1),
            '&.mystery': {
                backgroundColor: fade(theme.palette.rarity.godlike, .15)
            }
        },
        '&.mystery': {
            backgroundColor: `${fade(theme.palette.error.light, .2)} !important`,
        }
    }
}));