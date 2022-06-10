import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    tableThead: {
        backgroundColor: '#303030', color: '#9C9C9C',
        height: 40
    },
    tableTheadText: {
        color: '#9C9C9C !important',
        fontWeight: 500
    },
    blockhash: {
        color: '#1A73E8',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
    }
}));

export default useStyles;