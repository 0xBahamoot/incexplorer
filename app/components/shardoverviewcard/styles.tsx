import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
    paper: {
        backgroundColor: '#303030',
        borderRadius: 12,

        [`& svg`]: {
            color: '#757575'
        },
        '&:hover': {
            border: '1px solid #fff',
            cursor: 'pointer',

            [`& svg`]: {
                color: '#fff'
            },
        },
    },
    title: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 14,
        innerHeight: '140%',
        letterSpacing: '0.005em',
        margin: '0 0 10px 0',
        textTransform: 'capitalize',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 24,
        innerHeight: '140%',
        letterSpacing: '0.01em',
        margin: 0,
        color: '#fff'
    },
    propTitle: {
        color: '#757575',
        fontSize: 14,
    },
    propData: {
        color: '#fff',
        fontSize: 16,
        marginTop: -10,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '100%'
    }
}));

export default useStyles;