import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: '#1A1A1A'
    },
    tableThead: {
        backgroundColor: "#303030",
        color: "#9C9C9C",
        whiteSpace: "nowrap",
        maxHeight: 40,
    },
    tableTheadText: {
        color: "#9C9C9C !important",
        fontWeight: 500,
        lineHeight: "40px",
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