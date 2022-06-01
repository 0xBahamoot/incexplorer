import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    PairOverView: {
        height: 64,
        borderBottom: '1px solid #363636',
        padding: '8px 24px'
    },
    ChartTimeScale: {
        height: 50,
        borderBottom: '1px solid #363636'
    },
    container: {
        backgroundColor: '#1A1A1A',
        width: '100%',
        overflow: 'hidden'
    },
    tableThead: {
        backgroundColor: 'transperant', color: '#9C9C9C', whiteSpace: 'nowrap',
        height: 64
    },
    tableTheadText: {
        color: '#9C9C9C !important',
        fontWeight: 500,
    },
    periodBtn: {
        color: '#757575',
        '&:hover': {
            color: '#fff',
        },
    }
}));

export default useStyles;