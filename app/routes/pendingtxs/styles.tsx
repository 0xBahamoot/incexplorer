import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: '#1A1A1A'
    },
    tableThead: {
        backgroundColor: '#303030', color: '#9C9C9C',
        height: 40
    },
    paginationBox: {
        backgroundColor: '#303030',
        borderRadius: 100,
        height: 32
    },
    item: {
        backgroundColor: '#303030',
        color: '#757575',
        height: 32
    },
    active: {
        backgroundColor: '#303030',
        color: '#fff',
        height: 32
    },

    txhash: {
        color: '#1A73E8',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
    },
}));

export default useStyles;