import { createStyles } from '@mantine/core';
import { BorderRadius } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: '#1A1A1A',
        border: '1px solid #363636',
        overflow: 'hidden',
    },
    tableThead: {
        backgroundColor: '#303030', color: '#9C9C9C'
    },
    tableTheadText: {
        color: '#9C9C9C !important',
        fontWeight: 500,
        BorderRadius: 12
    }
}));

export default useStyles;