import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: '#1A1A1A',
        border: '1px solid #363636',
        overflow: 'hidden',
    },
    tableThead: {
        backgroundColor: '#303030', color: '#9C9C9C', height: 40
    },
    tableTheadText: {
        color: '#9C9C9C !important',
        fontWeight: 500,
        whiteSpace: 'nowrap',

    },
    hashText: {
        color: '#1A73E8',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
    },
    otherColumn: {
        color: '#fff',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        '&:hover': {
            color: '#1A73E8'
        }
    }
}));

export default useStyles;