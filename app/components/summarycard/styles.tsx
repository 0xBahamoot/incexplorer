import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    paper: {
        backgroundColor: '#303030',
        borderRadius: 12,
    },
    title: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 1,
        letterSpacing: '0.005em',
        margin: 0,
        textTransform: 'capitalize',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 26,
        lineHeight: '36.4px',
        letterSpacing: '0.01em',
        margin: '12px 0 0',
        color: '#fff'
    },
    subcontent: {
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
    }
}));

export default useStyles;