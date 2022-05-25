import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: '#1A1A1A',
        width: '100%',
        overflow: 'hidden'
    },
    tableThead: {
        backgroundColor: '#303030', color: '#9C9C9C', whiteSpace: 'nowrap', padding: 13
    },
    tableTheadText: {
        color: '#9C9C9C !important',
        fontWeight: 500
    }
}));

export default useStyles;