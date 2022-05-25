import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: '#1A1A1A',
        overflow: 'hidden'
    },
    tableThead: {
        backgroundColor: '#303030', color: '#9C9C9C'
    },
    wrapper: {
        backgroundColor: theme.colorScheme === 'dark' ? '#1A1A1A' : theme.white,
        borderColor: "#303030",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        marginBottom: 15,
        paddingBottom: 10,
        overflow: 'hidden',
        '&:last-child': {
            borderBottomWidth: 0
        }
    },
}));

export default useStyles;