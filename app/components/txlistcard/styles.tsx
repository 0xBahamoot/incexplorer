import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: '#1A1A1A',
        width: '100%',
        overflow: 'hidden'
    },
    tableThead: {
        backgroundColor: '#303030', color: '#9C9C9C', whiteSpace: 'nowrap',
        height: 40
    },
    tableTheadText: {
        color: '#9C9C9C !important',
        fontWeight: 500
    },
    timeColumn: {
        color: '#757575',
        fontWeight: 400,
        whiteSpace: 'nowrap'
    },
    otherColumn: {
        color: '#fff',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        '&:hover': {
            color: '#1A73E8'
        }
    },
    txhash: {
        color: '#1A73E8',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
        lineHeight: '32px',
    }
}));

export default useStyles;