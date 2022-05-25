import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: '#1A1A1A'
    },
    tableThead: {
        backgroundColor: '#303030', color: '#9C9C9C'
    },
    tableTheadText: {
        color: '#9C9C9C !important',
        fontWeight: 500
    }
}));

export default useStyles;